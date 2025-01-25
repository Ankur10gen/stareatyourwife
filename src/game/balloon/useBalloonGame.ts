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

    const getSpeed = useCallback((speed: number, type: 'heart' | 'poop'): number => {
        let min: number, max: number;

        if (type === 'heart') {
            switch (speed) {
                case 1:
                    min = 3;
                    max = 8;
                    break;
                case 2:
                    min = 1.5;
                    max = 6;
                    break;
                case 3:
                    min = 0.6;
                    max = 4;
                    break;
                default:
                    min = 1.5;
                    max = 6;
            }
        } else {
            switch (speed) {
                case 1:
                    min = 2;
                    max = 5;
                    break;
                case 2:
                    min = 1;
                    max = 3;
                    break;
                case 3:
                    min = 0.5;
                    max = 1.5;
                    break;
                default:
                    min = 1;
                    max = 3;
            }
        }

        return Math.random() * (max - min) + min;
    }, []);

    const spawnBubble = useCallback(() => {

        const speed = game?.speed || 1;
        const randomLeft = Math.random() * 70 + 15;
        const randomTop = Math.random() * 10 + 10;
        const id = Math.random().toString(36).substring(2, 9);
        const state: 'floating' | 'burst' = 'floating';

        const type: 'poop' | 'heart' = Math.random() < 0.05 + (speed - 1) * 0.025 ? 'poop' : 'heart';
        const score = type === 'poop' ? -5 : 1;

        const newBalloon = {
            id: id,
            top: randomTop, // Start at the top
            left: randomLeft, // Random horizontal position
            speed: getSpeed(speed, type),
            state,
            score,
            type
        };
        console.log("Spawning bubble", newBalloon);

        setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);

    }, [game?.speed, getSpeed]);

    const removeBalloon = useCallback((id: string) => {
        setBalloons((prevBalloons) => prevBalloons.filter((b) => b.id !== id));
    }, []);

    // Handle bubble burst
    const handleBubbleClick = useCallback((gameId: string, balloonId: string, event: React.MouseEvent<HTMLDivElement>) => {
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
    }, [balloons, game, isSinglePlayer, removeBalloon, setGameState, socket]);

    const onSpeedChange = useCallback((gameId: string, speed: number) => {
        setGameSpeed(gameId, speed, isSinglePlayer);
    }, [isSinglePlayer, setGameSpeed]);

    const getRandomInterval = useCallback((speed: number) => {
        let min, max;

        switch (speed) {
            case 1:  // Slow speed
                min = 1500;  // Minimum delay of 1.5 seconds
                max = 3000;  // Maximum delay of 3 seconds
                break;
            case 2:  // Medium speed
                min = 500;  // Minimum delay of 1 second
                max = 1000;  // Maximum delay of 2 seconds
                break;
            case 3:  // Fast speed
                min = 200;   // Minimum delay of 0.5 seconds
                max = 600;  // Maximum delay of 1.5 seconds
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
        console.log("startBalloonGame------");
        spawnWithRandomInterval();  // Start spawning balloons
    }, [spawnWithRandomInterval]);

    const closeBalloonGame = useCallback(() => {
        console.log("Clearing timeout");
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
