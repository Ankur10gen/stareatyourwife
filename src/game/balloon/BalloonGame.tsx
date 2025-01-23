import React, {useEffect} from "react";
import {GameControls} from "stare/game/GameControls";
import {useBalloonGame} from "stare/game/balloon/useBalloonGame";
import {GameType} from "stare/game/GameType";
import {Game} from "stare/game/socket/types";
import './BalloonGame.css';

interface BalloonGameProps {
    /*null in case of single player*/
    gameId: string | null;
    gameType?: GameType | null;
    game: Game,
}

export const BalloonGame = ({game, gameId, gameType}: BalloonGameProps) => {

    const isSinglePlayer = gameType === GameType.SINGLE_PLAYER

    const {
        showBubble,
        bubbleState,
        bubblePosition,
        handleBubbleClick,
        onSpeedChange,
        spawnBubble,
    } = useBalloonGame({isSinglePlayer: isSinglePlayer, game});

    useEffect(() => {
        spawnBubble(gameId);
        console.log("GameId:useEffect", gameId);
    }, [gameId]);

    const speed = game?.speed ?? 1;

    if (!gameId) return null;
    console.log("bubble state:", bubbleState, bubblePosition);
    return <>
        {showBubble && (
            <div
                className="bubble"
                data-state={bubbleState}
                style={{
                    top: bubbleState === 'burst' ? `${bubblePosition.top}px` : `${bubblePosition.top}%`,
                    left: bubbleState === 'burst' ? `${bubblePosition.left}px` : `${bubblePosition.left}%`,
                    animationDuration: bubbleState === 'burst' ? '.3s' : `${5 - speed}s`,
                }}
                onClick={(event) => {
                    handleBubbleClick(gameId, event);
                }}>
                <div className={'balloon'} data-state={bubbleState}/>
            </div>
        )}
        <GameControls onSpeedChange={(speed) => onSpeedChange(gameId, speed)} speed={speed}/>
    </>
}
