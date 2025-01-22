import React, {useCallback, useRef, useState} from "react";
import {useGameSocket} from "stare/game/socket/useGameSocket";
import {Game, GameStatus} from "stare/game/socket/types";

interface BalloonGameProps {
    isSinglePlayer: boolean;
    game: Game,
}

export const useBalloonGame = ({game, isSinglePlayer}: BalloonGameProps) => {

    const [showBubble, setShowBubble] = useState<boolean>(false);
    const [bubbleState, setBubbleState] = useState<'floating' | 'burst'>('floating');
    const [bubblePosition, setBubblePosition] = useState<{ top: number; left: number }>({top: 0, left: 0});
    const bubbleTimeout = useRef<NodeJS.Timeout | null>(null);

    const {socket, setGameOver, setGameSpeed, setGameState} = useGameSocket();

    const spawnBubble = useCallback((gameId: string | null) => {
        console.log("Spawning bubble");
        const challengeOver = game?.status === GameStatus.finished;
        const speed = game?.speed || 1;
        if (challengeOver) return;

        const randomLeft = Math.random() * 35 + 30;
        const randomTop = Math.random() * 10 + 10;

        setBubblePosition({top: randomTop, left: randomLeft});
        setShowBubble(true);

        if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);

        bubbleTimeout.current = setTimeout(() => {
            setShowBubble(false);
            if (gameId) {
                setGameOver(gameId, isSinglePlayer);
            }
        }, 1000 * (5 - speed));
    }, [game?.speed, game?.status, isSinglePlayer, setGameOver]);

    // Handle bubble burst
    const handleBubbleClick = (gameId: string, event: React.MouseEvent<HTMLDivElement>) => {
        console.log("Bubble clicked");
        const bubbleElement = event.currentTarget as HTMLDivElement;
        const rect = bubbleElement.getBoundingClientRect();

        // Freeze bubble position
        const top = bubbleElement.offsetParent?.getBoundingClientRect().top || 0;
        const left = bubbleElement.offsetParent?.getBoundingClientRect().left || 0;
        const frozenTop = rect.top - top;
        const frozenLeft = rect.left - left;

        console.log("Bubble position:", frozenTop, frozenLeft);

        setBubblePosition({top: frozenTop, left: frozenLeft});
        setBubbleState('burst');

        setTimeout(() => {
            setBubbleState("floating");
            setShowBubble(false);
        }, 300);

        if (isSinglePlayer) {

            const players = game.players;
            // increment score for all user
            const newPlayers = Object.keys(players).reduce((acc, player) => {
                const newPlayer = {
                    ...players[player],
                    score: players[player].score + 1
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
            socket?.emit('bubbleBurst', {gameId, score: 1});
        }

        if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);

        const speed = game?.speed || 1;
        setTimeout(() => {
            const challengeOver = game?.status === GameStatus.finished;
            if (!challengeOver) spawnBubble(gameId);
        }, 1000 * (2 / speed));
    };


    const onSpeedChange = useCallback((gameId: string, speed: number) => {
        setGameSpeed(gameId, speed, isSinglePlayer);
        if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);
        spawnBubble(gameId);
    }, [isSinglePlayer, setGameSpeed, spawnBubble]);

    return {
        showBubble,
        bubbleState,
        bubblePosition,
        handleBubbleClick,
        onSpeedChange,
        spawnBubble,
        speed: game?.speed
    };
}
