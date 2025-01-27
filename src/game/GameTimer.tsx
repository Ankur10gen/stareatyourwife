import React, {useCallback, useEffect, useState} from "react";

const GameTimer = ({onGameEnd, timeInMillis}: { timeInMillis?: number, onGameEnd: () => void }) => {
    const [remainingTime, setRemainingTime] = useState(timeInMillis ?? 120); // 120 seconds (2 minutes)

    useEffect(() => {
        if (remainingTime <= 0) {
            onGameEnd(); // Call the function to end the game when time runs out
            return;
        }

        console.log("GameTimer:remainingTime:", remainingTime);
    }, [onGameEnd, remainingTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1); // Decrement the time by 1 second
        }, 1000);

        return () => {
            console.log("GameTimer:cleanup");
            clearInterval(timer);
        }
    }, []);

    // Convert seconds to minutes and seconds format
    const formatTime = useCallback((time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }, []);

    return (
        <div className={'absolute top-5 right-5'}>
            <h2>End in: {formatTime(remainingTime)}</h2>
        </div>
    );
};

export default GameTimer;
