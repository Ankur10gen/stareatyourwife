'use client'
import React, {useRef, useState} from "react";
import {SocialShare} from "stare/home/social-share/SocialShare";
import './GamingSection.css';
import {GameSetup, GameState} from "stare/game/game-setup/GameSetup";
import {GameBackground} from "stare/game/image-view/GameBackground";
import {BalloonGame} from "stare/game/BalloonGame";
import {useGameSocket} from "stare/game/socket/useGameSocket";
import {GameScore} from "stare/home/gaming/GameScore";
import {GameResult} from "stare/home/gaming/GameResult";
import {ChallengeType, GameType} from "stare/home/gaming/GameType";

interface GamingSectionProps {
    gameType?: GameType | null;
    challengeType?: ChallengeType | null;
}

export const GamingSection = ({gameType, challengeType}: GamingSectionProps) => {

    const screenshotRef = useRef<HTMLDivElement>(null);

    const [gameState, setGameState] = useState<GameState | null>();
    const {game, createGame, startGame, joinGame} = useGameSocket();
    const isInGame = game?.status === 'started';
    console.log("isInGame:", isInGame);

    // Start a new game
    const onCreateGame = (gameState: GameState) => {
        console.log("Creating game with state:", gameState);
        setGameState(gameState);
        const gameId = gameState.gameId;
        const playerName = gameState.playerName;
        const challenge = gameState.challenge;
        const isSinglePlayer = gameState.isSinglePlayer;
        if (gameId && playerName) {
            createGame({gameId, playerName, challenge, isSinglePlayer: isSinglePlayer ?? false});
        }
    };

    const onStartGame = (gameId: string) => {
        console.log("Starting game with id:", gameId);
        if (gameId) {
            startGame(gameId);
        }
    };

    const onJoinGame = (gameState: GameState) => {
        setGameState(gameState);
        const gameId = gameState.gameId;
        const playerName = gameState.playerName;
        console.log("Joining game with id:", gameId);
        if (gameId && playerName) {
            joinGame({gameId, playerName});
        }
    };

    const imageUrl = gameState?.imageUrl;
    const gameId = gameState?.gameId ?? null;
    console.log("GameSection game:", game);

    const isStarted = game?.status === 'started';

    return (
        <div ref={screenshotRef} className="relative m-0 p-0">

            <GameSetup createGame={onCreateGame}
                       game={game}
                       challengeType={challengeType}
                       gameType={gameType}
                       startGame={onStartGame}
                       joinGame={onJoinGame}/>

            {imageUrl && <GameBackground imageUrl={imageUrl}/>}

            {isStarted && <BalloonGame gameId={gameId} gameType={gameType} game={game}/>}

            <GameScore game={game}/>
            <GameResult game={game}/>
            <SocialShare screenshotRef={screenshotRef}/>
        </div>
    );
};
