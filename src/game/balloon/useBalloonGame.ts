import React, {useCallback, useState} from "react";
import {useGameSocket} from "stare/game/socket/useGameSocket";
import {Game} from "stare/game/socket/types";

interface BalloonGameProps {
    isSinglePlayer: boolean;
    game: Game,
}

interface GameObject {
    id: string;
    top: number;
    left: number;
    speed: number;
    state: 'floating' | 'burst';
    score: number;
    type: 'heart' | 'poop';
}

export const useBalloonGame = ({game, isSinglePlayer}: BalloonGameProps) => {

    const {socket, setGameOver, setGameSpeed, setGameState} = useGameSocket();

    const [balloons, setBalloons] = useState<GameObject[]>([]);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const spawnBubble = useCallback(() => {

        const speed = game?.speed || 1;
        const randomLeft = Math.random() * 70 + 15;
        const randomTop = Math.random() * 10 + 10;
        const id = Math.random().toString(36).substring(2, 9);
        const state: 'floating' | 'burst' = 'floating';

        /*if speed is 1, create 10% poop
        * speed:2, poop:15%
        * speed:3, poop:20%
        * */
        const type: 'poop' | 'heart' = Math.random() < 0.1 + (speed - 1) * 0.05 ? 'poop' : 'heart';
        const score = type === 'poop' ? -5 : 1;

        const newBalloon = {
            id: id,
            top: randomTop, // Start at the top
            left: randomLeft, // Random horizontal position
            speed: Math.random() * speed + 1, // Random speed between 2 and 5 seconds
            state,
            score,
            type
        };
        console.log("Spawning bubble", newBalloon);

        setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);

    }, [game?.speed]);

    // Handle bubble burst
    const handleBubbleClick = (gameId: string, balloonId: string, event: React.MouseEvent<HTMLDivElement>) => {
        console.log("Bubble clicked");
        const bubbleElement = event.currentTarget as HTMLDivElement;
        const rect = bubbleElement.getBoundingClientRect();

        // Freeze bubble position
        const top = bubbleElement.offsetParent?.getBoundingClientRect().top || 0;
        const left = bubbleElement.offsetParent?.getBoundingClientRect().left || 0;
        const frozenTop = rect.top - top;
        const frozenLeft = rect.left - left;

        console.log("Bubble position:", frozenTop, frozenLeft);

        // Update balloon state
        const balloon = balloons.find(b => b.id === balloonId);
        if (!balloon) return;

        setBalloons((prevBalloons) =>
            prevBalloons.map((b) =>
                b.id === balloonId ? {...b, top: frozenTop, left: frozenLeft, state: 'burst'} : b
            )
        );

        setTimeout(() => {
            removeBalloon(balloonId);
        }, 300);

        if (isSinglePlayer) {

            const players = game.players;
            // increment score for all user
            const newPlayers = Object.keys(players).reduce((acc, player) => {
                const newPlayer = {
                    ...players[player],
                    score: players[player].score + balloon.score
                };
                return {
                    ...acc,
                    [player]: newPlayer
                };
            }, {});

            console.log("New players:", players, newPlayers);
            setGameState({
                ...game,
                players: newPlayers
            });
        } else {
            socket?.emit('bubbleBurst', {gameId, score: balloon.score});
        }
    };

    const onSpeedChange = useCallback((gameId: string, speed: number) => {
        setGameSpeed(gameId, speed, isSinglePlayer);
    }, [isSinglePlayer, setGameSpeed]);

    const removeBalloon = useCallback((id: string) => {
        setBalloons((prevBalloons) => prevBalloons.filter((b) => b.id !== id));
    }, []);

    const getRandomInterval = useCallback((speed: number) => {
        let min, max;

        switch (speed) {
            case 1:  // Slow speed
                min = 1500;  // Minimum delay of 1.5 seconds
                max = 3000;  // Maximum delay of 3 seconds
                break;
            case 2:  // Medium speed
                min = 700;  // Minimum delay of 1 second
                max = 1500;  // Maximum delay of 2 seconds
                break;
            case 3:  // Fast speed
                min = 500;   // Minimum delay of 0.5 seconds
                max = 1000;  // Maximum delay of 1.5 seconds
                break;
            default:  // Default to medium speed
                min = 1000;
                max = 2000;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, []);

    const spawnWithRandomInterval = useCallback(() => {
        spawnBubble();  // Spawn a balloon

        const speed = game?.speed || 1;
        const randomDelay = getRandomInterval(speed);  // Get a random delay
        console.log("spawnWithRandomInterval", randomDelay, speed);

        timeoutRef.current = setTimeout(spawnWithRandomInterval, randomDelay);
    }, [game?.speed, getRandomInterval, spawnBubble]);

    const startBalloonGame = useCallback(() => {
        spawnWithRandomInterval();  // Start spawning balloons
    }, [spawnWithRandomInterval]);

    const closeBalloonGame = useCallback(() => {
        console.log("Stopping balloon game");
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            setBalloons([]);
        }
    }, []);

    const stopBalloonGame = useCallback((gameId: string) => {
        console.log("Stopping balloon game");
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            setBalloons([]);
            setGameOver(gameId, isSinglePlayer);
        }
    }, [isSinglePlayer, setGameOver]);

    return {
        startBalloonGame,
        closeBalloonGame,
        handleBubbleClick,
        onSpeedChange,
        balloons,
        removeBalloon,
        stopBalloonGame,
        speed: game?.speed
    };
}
