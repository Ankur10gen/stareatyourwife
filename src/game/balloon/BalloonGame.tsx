import React, {useEffect} from "react";
import {GameControls} from "stare/game/GameControls";
import {useBalloonGame} from "stare/game/balloon/useBalloonGame";
import {GameType} from "stare/game/GameType";
import {Game} from "stare/game/socket/types";
import './Heart.css';
import './Poop.css'

interface BalloonGameProps {
    /*null in case of single player*/
    gameId: string;
    gameType?: GameType | null;
    game: Game,
}

export const BalloonGame = ({game, gameId, gameType}: BalloonGameProps) => {

    const isSinglePlayer = gameType === GameType.SINGLE_PLAYER

    const {
        balloons,
        startBalloonGame,
        closeBalloonGame,
        handleBubbleClick,
        onSpeedChange,
        removeBalloon,
        stopBalloonGame
    } = useBalloonGame({isSinglePlayer: isSinglePlayer, game});

    useEffect(() => {
        console.log("useEffect Starting balloon game");
        startBalloonGame();
        return () => {
            closeBalloonGame();
        }
    }, [startBalloonGame, closeBalloonGame]);

    const speed = game?.speed ?? 1;

    console.log("BalloonGame game:", balloons.length);

    return <>
        {balloons.map((balloon) => (
                <div key={balloon.id}
                     className={balloon.type}
                     data-state={balloon.state}
                     style={{
                         top: balloon.state === 'burst' ? `${balloon.top}px` : `${balloon.top}%`,
                         left: balloon.state === 'burst' ? `${balloon.left}px` : `${balloon.left}%`,
                         animationDuration: balloon.state === 'burst' ? '.3s' : `${4 - speed}s`,
                     }}
                     onClick={(event) => {
                         handleBubbleClick(gameId, balloon.id, event);
                     }}
                     onAnimationEnd={() => {
                         if (balloon.type === 'heart' && balloon.state === 'floating') {
                             stopBalloonGame(gameId)
                         } else if (balloon.type === 'poop' && balloon.state === 'burst') {
                             removeBalloon(balloon.id)
                         }
                     }}>
                    <div className={`${balloon.type}-inner`} data-state={balloon.state}/>
                </div>
            )
        )}
        <GameControls onSpeedChange={(speed) => onSpeedChange(gameId, speed)} speed={speed}/>
    </>
}
