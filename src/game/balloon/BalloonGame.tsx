import React, {useEffect} from "react";
import {GameControls} from "stare/game/GameControls";
import {useBalloonGame} from "stare/game/balloon/useBalloonGame";
import {Game} from "stare/game/socket/types";
import './Heart.css';
import './Poop.css'
import GameTimer from "stare/game/GameTimer";

interface BalloonGameProps {
    /*null in case of single player*/
    gameId: string;
    isSinglePlayer: boolean;
    game: Game,
}

export const BalloonGame = (
    {
        game,
        gameId,
        isSinglePlayer
    }: BalloonGameProps) => {

    const {
        balloons,
        startBalloonGame,
        handleBubbleClick,
        onSpeedChange,
        removeBalloon,
        stopBalloonGame,
        closeBalloonGame,
    } = useBalloonGame({isSinglePlayer: isSinglePlayer, game});

    const isStarted = game?.status === 'started';
    const isFinished = game?.status === 'finished';

    useEffect(() => {
        if (isStarted) {
            console.log("--------Balloon Game status:", isStarted);
            startBalloonGame();
        }
        return () => {
            closeBalloonGame();
        }
    }, [closeBalloonGame, isStarted, startBalloonGame]);

    useEffect(() => {
        if (isFinished) {
            console.log("--------Balloon Game isFinished:", isFinished);
            closeBalloonGame();
        } else {
            console.log("--------Balloon Game isFinished else:", isFinished);
        }
    }, [closeBalloonGame, isFinished]);

    return <>
        {isStarted && <GameTimer onGameEnd={() => {
            stopBalloonGame(gameId)
        }} timeInMillis={game.duration ?? 60}/>}
        {balloons.map((balloon) => (
                <div key={balloon.id}
                     className={balloon.type}
                     data-state={balloon.state}
                     style={{
                         top: balloon.state === 'burst' ? `${balloon.top}px` : `${balloon.top}%`,
                         left: balloon.state === 'burst' ? `${balloon.left}px` : `${balloon.left}%`,
                         animationDuration: balloon.state === 'burst' ? '.3s' : `${balloon.speed}s`,
                     }}
                     onClick={(event) => {
                         handleBubbleClick(gameId, balloon.id, event);
                     }}
                     onAnimationEnd={() => {
                         if (balloon.type === 'heart') {
                             removeBalloon(balloon.id)
                         }
                         // if (balloon.type === 'heart' && balloon.state === 'floating') {
                         //     stopBalloonGame(gameId)
                         // }
                         // else if (balloon.type === 'poop' && balloon.state === 'floating') {
                         //     removeBalloon(balloon.id)
                         // }
                     }}>
                    <div className={`${balloon.type}-inner`} data-state={balloon.state}/>
                </div>
            )
        )}
        <GameControls onSpeedChange={(speed) => onSpeedChange(gameId, speed)} speed={game.speed}/>
    </>
};
