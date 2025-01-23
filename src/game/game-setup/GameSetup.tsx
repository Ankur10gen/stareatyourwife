import React, {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {CSSPlugin} from "gsap/CSSPlugin";
import "./GameSetup.css";
import {ChallengeType, GameType} from "stare/game/GameType";
import {Game} from "stare/game/socket/types";

gsap.registerPlugin(CSSPlugin);

interface GameInputProps {
    game: Game,
    createGame?: (gameState: GameState) => void,
    startGame?: (gameId: string) => void,
    joinGame?: (gameState: GameState) => void,
    challengeType?: ChallengeType | null,
    gameType?: GameType | null | undefined
}

export type GameState = {
    gameId: string | null,
    playerName: string | null,
    challenge: string | null,
    imageUrl: string | null,
    isSinglePlayer: boolean | null
}

export const GameSetup = ({game, createGame, startGame, joinGame, challengeType, gameType}: GameInputProps) => {
    const isAcceptor = challengeType === ChallengeType.ACCEPTOR;
    const isSinglePlayer = gameType === GameType.SINGLE_PLAYER;
    const initialStep = isSinglePlayer ? 2 : isAcceptor ? 2 : 1;
    const [step, setStep] = useState(initialStep);
    const stepRef = useRef(null);
    const buttonRef = useRef(null);
    const backgroundRef = useRef(null);
    const [gameState, setGameState] = useState<GameState>({
        gameId: null,
        playerName: null,
        challenge: null,
        imageUrl: null,
        isSinglePlayer: isSinglePlayer
    });
    const {error} = game ?? {};
    const isGameJoined = game?.status === 'joined';
    const isGameStarted = game?.status === 'started';
    const isGameFinished = game?.status === 'finished';

    console.log("GameSetup:isGameStarted:", isGameStarted, game);

    useEffect(() => {
        // Timeline for step animations
        const tl = gsap.timeline();
        tl.fromTo(
            stepRef.current,
            {opacity: 0, scale: 0.5, y: 50},
            {opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)"}
        );

        // Add a glow effect to buttons
        if (buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                {boxShadow: "0px 0px 10px rgba(255, 255, 0, 0)"},
                {
                    boxShadow: "0px 0px 20px rgba(255, 255, 0, 1)",
                    repeat: -1,
                    yoyo: true,
                    duration: 1.2,
                }
            );
        }

        // Floating particle effect in the background
        // gsap.to(backgroundRef.current, {
        //     backgroundPosition: "200% 0",
        //     duration: 8,
        //     repeat: -1,
        //     ease: "linear",
        // });
    }, [step]);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    if (isGameStarted || isGameFinished) {
        return null;
    }

    return (
        <div ref={backgroundRef} className="stare-challenge-container">
            <div ref={stepRef} className="step-content">
                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <>
                        <h2>🎯 What’s the Dare?</h2>
                        <p>Dishwashing, Movies, or something epic? Set the stakes!</p>
                        <input type="text" placeholder="Enter your dare" onChange={
                            (e) => setGameState({...gameState, challenge: e.target.value})
                        }/>
                        <button ref={buttonRef} onClick={() => {
                            if (!gameState.challenge) {
                                alert("Please enter a challenge");
                                return;
                            }
                            nextStep();
                        }}>
                            Next ➡️
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2>📸 Upload Your Partner’s Image</h2>
                        <p>Time to make them the star of the game!</p>
                        <input type="file" accept="image/*" onChange={
                            (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const imgSrc = URL.createObjectURL(file);
                                    setGameState({...gameState, imageUrl: imgSrc});
                                } else {
                                    alert("No file selected or file type is not supported.");
                                }
                            }
                        }/>
                        <div className={'flex justify-around'}>
                            <button ref={buttonRef} onClick={prevStep}>
                                ⬅️ Back
                            </button>
                            <button ref={buttonRef} onClick={() => {
                                if (!gameState.imageUrl) {
                                    alert("Please upload an image");
                                    return;
                                }
                                if (isSinglePlayer) {
                                    createGame?.({
                                        ...gameState,
                                        gameId: 'single-player',
                                        playerName: "Player 1",
                                        isSinglePlayer: true,
                                    });
                                } else {
                                    nextStep();
                                }
                            }}>
                                Next ➡️
                            </button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <h2>✨ Choose a Couple Name</h2>
                        <p>Get creative! For example, {"AnkurAparna"}.</p>
                        <input type="text" placeholder="Enter your couple name"
                               onChange={(e) => setGameState({...gameState, gameId: e.target.value})}
                        />

                        <div className={'flex justify-around'}>
                            <button ref={buttonRef} onClick={prevStep}>
                                ⬅️ Back
                            </button>
                            <button ref={buttonRef} onClick={() => {
                                if (!gameState.gameId) {
                                    alert("Please enter a couple name");
                                    return;
                                }
                                nextStep();
                            }}>Next ➡️
                            </button>
                        </div>
                    </>
                )}
                {step === 4 && (
                    <>
                        <h2>🤝 Enter Your Name</h2>
                        <p>Mark yourself as the challenger!</p>
                        <input type="text" placeholder="Enter your name"
                               onChange={(e) => setGameState({...gameState, playerName: e.target.value})}
                        />
                        <button ref={buttonRef} onClick={() => {
                            if (!gameState.playerName) {
                                alert("Please enter your name");
                                return;
                            }
                            nextStep();

                            if (isAcceptor) {
                                joinGame?.(gameState);
                            } else {
                                createGame?.(gameState);
                            }
                        }}>
                            {!isAcceptor ? "Give Challenge 🚀" : "Accept Challenge 🚀"}
                        </button>
                    </>
                )}
                {step === 5 && (
                    <>
                        <h2>🔥 Challenge Ready!</h2>
                        <p>Let the game begin—good luck!</p>
                        <p>Share your Couple ID with your partner to join the same game:</p>
                        <div style={{marginTop: "10px", fontWeight: "bold", fontSize: "20px"}}>
                            Couple ID: {gameState.gameId}
                        </div>
                        {
                            isGameJoined && !isAcceptor ? (
                                <button ref={buttonRef} onClick={() => {
                                    startGame?.(gameState.gameId!);
                                }}>
                                    Start Challenge 🚀
                                </button>
                            ) : (
                                <p style={{marginTop: "20px", fontStyle: "italic"}}>
                                    {isAcceptor
                                        ? "Waiting for your opponent to start... ⏳"
                                        : "Waiting for your opponent to join... ⏳"}
                                </p>
                            )

                        }
                    </>
                )}
            </div>
        </div>
    );
};
