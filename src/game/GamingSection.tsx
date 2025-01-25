'use client'
import React, {useCallback, useRef, useState} from "react";
import {SocialShare} from "stare/home/social-share/SocialShare";
import {GameState} from "stare/game/game-setup/GameSetup";
import {GameBackground} from "stare/game/image-view/GameBackground";
import {BalloonGame} from "stare/game/balloon/BalloonGame";
import {useGameSocket} from "stare/game/socket/useGameSocket";
import {GameScore} from "stare/game/GameScore";
import {GameResult} from "stare/game/GameResult";
import {GameSetup2} from "stare/game/game-setup/GameSetup2";
import {ImageBanner} from "stare/home/banner/image-banner/ImageBanner";
import {ErrorMsg} from "stare/game/error/ErrorMsg";

export const GamingSection = () => {
    console.log('---GamingSection---');

    const screenshotRef = useRef<HTMLDivElement>(null);

    const [gameState, setGameState] = useState<GameState | null>();
    const {game, createGame, startGame, joinGame} = useGameSocket();
    const isFinished = game?.status === 'finished';

    // Start a new game
    const onCreateGame = useCallback((gameState: GameState) => {
        console.log("Creating game with state:", gameState);
        setGameState(gameState);
        const gameId = gameState.gameId;
        const playerName = gameState.playerName;
        const challenge = gameState.challenge;
        const isSinglePlayer = gameState.isSinglePlayer;
        if (gameId && playerName) {
            createGame({gameId, playerName, challenge, isSinglePlayer: isSinglePlayer ?? false});
        }
    }, [createGame]);

    const onStartGame = useCallback((gameId: string) => {
        console.log("Starting game with id:", gameId);
        if (gameId) {
            startGame(gameId);
        }
    }, [startGame]);

    const onJoinGame = useCallback((gameState: GameState) => {
        setGameState(gameState);
        const gameId = gameState.gameId;
        const playerName = gameState.playerName;
        console.log("Joining game with id:", gameId);
        if (gameId && playerName) {
            joinGame({gameId, playerName});
        }
    }, [joinGame]);

    const imageUrl = gameState?.imageUrl;
    const gameId = gameState?.gameId ?? null;
    const isSinglePlayer = gameState?.isSinglePlayer ?? false;
    const isChallenger = gameState?.isChallenger ?? false;

    return (
        <div ref={screenshotRef} className="relative m-0 p-4 h-full flex flex-col justify-center items-center">

            {!gameState && <ImageBanner
                createGame={onCreateGame}
                joinGame={onJoinGame}
            />}
            {gameId && <GameSetup2 game={game}
                                   isChallenger={isChallenger}
                                   isSinglePlayer={isSinglePlayer}
                                   gameId={gameId}
                                   startGame={onStartGame}/>
            }

            {gameState && <GameBackground imageUrl={imageUrl}/>}
            {gameState && <ErrorMsg onClose={() => setGameState(null)}/>}

            {gameId &&
                <BalloonGame
                    gameId={gameId}
                    isSinglePlayer={isSinglePlayer}
                    game={game}
                />}

            <GameScore/>
            {gameId &&
                <GameResult game={game}
                            gameId={gameId}
                            isSinglePlayer={isSinglePlayer}
                            isChallenger={isChallenger}/>}
            {isFinished && <SocialShare screenshotRef={screenshotRef}/>}
        </div>
    );
};
