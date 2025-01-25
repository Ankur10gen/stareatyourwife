import React, {useEffect, useState} from "react";
import {GameInputProps} from "stare/game/game-setup/GameSetup";
import '../../home/banner/image-banner/ImageBanner.css'
import {PromptComponent} from "stare/game/prompt/PromptComponent";

export const GameSetup2 = ({
                               game,
                               gameId,
                               startGame,
                               isChallenger,
                               isSinglePlayer
                           }: Omit<GameInputProps, 'createGame' | 'joinGame'> & {
    gameId: string
}) => {
    const [isMindfullness, setIsMindfullness] = useState<boolean>(true);

    const isAcceptor = !isChallenger;
    const {error} = game ?? {};
    const isGameJoined = game?.status === 'joined';
    const isGameStarted = game?.status === 'started';
    const isGameFinished = game?.status === 'finished';
    const isGameWaiting = game?.status === 'waiting';

    useEffect(() => {
        if (isGameStarted) {
            setIsMindfullness(true);
        }
    }, [isGameStarted]);

    console.log("GameSetup:isGameStarted:", isGameStarted, game);

    if (isGameStarted) {
        return null;
    }

    if (isGameFinished) {
        if (isMindfullness) {
            return <PromptComponent onClose={() => setIsMindfullness(false)}/>
        }
        return null;
    }

    if (isSinglePlayer) {
        return null;
    }

    if (error) {
        return null;
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                {
                    isGameWaiting && <><h3>
                        {isAcceptor
                            ? "Waiting for your opponent to start... ⏳"
                            : "Waiting for your opponent to join... ⏳"
                        }</h3>
                        <div>Duo name: {gameId}</div>
                    </>
                }
                {
                    isGameJoined && isAcceptor && (
                        <h3>Waiting for your opponent to start... ⏳</h3>
                    )
                }
                {
                    isGameJoined && !isAcceptor && (
                        <button onClick={() => {
                            startGame?.(gameId!);
                        }}>
                            Start Challenge 🚀
                        </button>
                    )
                }
            </div>
        </div>
        // <PromptComponent/>
    )
};
