import React, {useCallback, useMemo, useState} from 'react';
import './ImageBanner.css';
import {GameInputProps} from "stare/game/game-setup/GameSetup";

/*omit game, startGame,gameType from GameInputProps*/
export const ImageBanner = ({
                                createGame,
                                joinGame,
                            }: Omit<GameInputProps, 'game' | 'startGame' | 'isSinglePlayer' | 'isChallenger'>) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isChallenger, setIsChallenger] = useState(false);
    const [gameName, setGameName] = useState("");
    const [challenge, setChallenge] = useState("");
    const uploadedImage = useMemo(() => sessionStorage.getItem('stare-image'), []);

    const handleLaunchClick = (isChallenger: boolean) => {
        setIsChallenger(isChallenger);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleStartGame = () => {
        if (gameName.trim()) {
            // alert(`Game "${gameName}" created! Share this name to accept the challenge.`);
            setIsDialogOpen(false);
            sessionStorage.setItem('stare-game-name', gameName);
            sessionStorage.setItem('stare-game-challenge', challenge);

            const gameId = gameName;
            const playerName = isChallenger ? "Challenger" : "Acceptor";
            if (!gameId || !uploadedImage) {
                return;
            }

            const state = {
                gameId,
                playerName,
                challenge,
                imageUrl: uploadedImage,
                isSinglePlayer: false,
                isChallenger: isChallenger
            };
            if (isChallenger) {
                createGame?.(state);
            } else {
                joinGame?.(state);
            }
        } else {
            alert("Please enter a unique game name.");
        }
    };
    const handleSinglePlay = useCallback(() => {
        setGameName("Single-Player");
        const gameId = 'Challenger';
        const playerName = "Challenger";
        if (!gameId || !uploadedImage) {
            return;
        }

        const state = {
            gameId,
            playerName,
            challenge,
            imageUrl: uploadedImage,
            isSinglePlayer: true,
            isChallenger: true
        };
        createGame?.(state);

    }, [challenge, createGame, uploadedImage]);

    if (!uploadedImage) {
        return null;
    }

    return (
        <div className="uploaded-photo-container">
            <img src={uploadedImage} alt="Uploaded" className="uploaded-photo"/>
            <div className="button-container">
                <button className="stare-button"
                        onClick={() => handleLaunchClick(true)}>
                    LAUNCH
                </button>
                <button className="stare-button"
                        onClick={() => handleLaunchClick(false)}>
                    ACCEPT
                </button>
                <button className="stare-button"
                        onClick={() => handleSinglePlay()}>
                    PRACTICE
                </button>
            </div>
            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h3>Give Your Duo a Unique Name</h3>
                        <input
                            type="text"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                            placeholder="unique duo name like friends-forever"
                        />

                        {isChallenger && <input
                            className={'mb-1'}
                            type="text"
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                            placeholder="e.g., Sing a song, do 10 pushups, cook dinner..."
                        />}
                        {isChallenger && <div className={"challenge-text mb-2"}>
                            Optional: Enter a dare (loser must do this, e.g., sing a song or cook dinner)
                        </div>}

                        <div>
                            <button onClick={handleStartGame}>{isChallenger ? "Start Game" : "Join Game"}</button>
                            <button onClick={handleDialogClose} style={{marginLeft: "10px"}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
