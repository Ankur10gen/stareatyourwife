'use client'
import {useCallback, useEffect} from "react";
import {useSocket} from "stare/game/socket/SocketProvider";
import {Game, GameAction, GameEvent, GameStatus} from "stare/game/socket/types";

const prompts = [
    "Give silent compliments to each other in your mind while maintaining eye contact.",
    "Think about one way you’ve supported each other recently and hold onto that feeling.",
    "While staring, reflect on one thing you deeply appreciate about your partner. Share it later.",
    "Recall a fun or meaningful memory you share and smile about it together.",
    "Sync your breathing for 10 seconds while looking into each other’s eyes.",
];

export const useGameSocket = () => {
    const {socket, game, setGame} = useSocket();
    console.log("useGameSocket socket:", socket?.id, socket?.connected);

    const setGameState = useCallback((game: Game) => {
        console.log("Game state changed:", game);
        setGame(game);
    }, [setGame]);

    useEffect(() => {
        if (!socket) return;

        socket.on(GameEvent.onStateChanged, (game: Game) => {
            setGameState(game);
        });

        return () => {
            socket.off(GameEvent.onStateChanged);
        };
    }, [setGameState, socket]);

    const createGame = useCallback(({gameId, playerName, challenge, isSinglePlayer}: {
        gameId: string,
        playerName: string,
        challenge: string | null,
        isSinglePlayer: boolean | null
    }) => {
        console.log("Creating game:", gameId, playerName, challenge, socket?.id, socket?.connected, '----');
        if (isSinglePlayer === true) {
            console.log("Single player game");
            setGameState({
                ...game,
                status: 'started' as GameStatus,
                players: {
                    [playerName]: {
                        name: playerName,
                        score: 0
                    }
                },
                challenge: challenge
            })
            return;
        } else {
            console.log("Multiplayer game");
            socket?.emit(GameAction.createGame, {gameId, playerName, challenge});
        }
    }, [socket, setGameState, game])

    const restartGame = useCallback((gameId: string, isSinglePlayer: boolean) => {
        console.log("Restart game:");
        if (isSinglePlayer) {
            console.log("Single player game");
            const playerName = Object.keys(game.players)[0];
            setGameState({
                status: 'started' as GameStatus,
                players: {
                    [playerName]: {
                        name: playerName,
                        score: 0
                    }
                },
                challenge: game.challenge,
                speed: 1,
                error: null,
                result: null,
                prompt: null,
                duration: 120
            })
            return;
        } else {
            console.log("Multiplayer game");
            socket?.emit(GameAction.restartGame, {gameId});
        }
    }, [game.challenge, game.players, setGameState, socket])

    const startGame = useCallback((gameId: string) => {
        socket?.emit(GameAction.startGame, {gameId});
    }, [socket])

    const joinGame = useCallback(({gameId, playerName}: { gameId: string, playerName: string }) => {
        console.log("Joining game socket:", gameId);
        socket?.emit(GameAction.joinGame, {gameId, playerName});
    }, [socket])

    const setGameOver = useCallback((gameId: string, isSinglePlayer: boolean | null) => {
        console.log("Game over:", gameId);
        if (isSinglePlayer) {
            setGameState({
                ...game,
                result: {
                    winner: Object.keys(game.players)[0],
                    score: Object.values(game.players)[0].score,
                    message: "Stare Game Sprint Ends"
                },
                status: GameStatus.finished,
                prompt: prompts[Math.floor(Math.random() * prompts.length)]
            })
            return;
        }
        socket?.emit(GameAction.gameOver, {gameId});
    }, [game, setGameState, socket]);

    const setGameSpeed = useCallback((gameId: string, speed: number, isSinglePlayer: boolean | null) => {
        if (isSinglePlayer) {
            setGameState({
                ...game,
                speed: speed
            })
            return;
        } else {
            socket?.emit(GameAction.setSpeed, {gameId, speed});
        }
    }, [game, setGameState, socket]);

    return {
        socket,
        game,
        createGame,
        startGame,
        joinGame,
        setGameOver,
        setGameSpeed,
        setGameState,
        restartGame
    };
}
