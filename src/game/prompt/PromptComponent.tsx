import React, {useEffect, useState} from "react";
import './Prompt.css';

interface PromptComponentProps {
    onClose?: () => void;
    prompt: string|null;
}

export const PromptComponent = ({onClose, prompt}: PromptComponentProps) => {

    // const [currentPrompt, setCurrentPrompt] = useState("");
    const [timeLeft, setTimeLeft] = useState(30); // Rest time in seconds

    useEffect(() => {
        // Set a random prompt when the component loads
        // setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

        // Countdown logic
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer)
                    onClose?.();
                }
                // Stop timer at 0
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup
    }, [onClose]);

    return (
        <div className={'prompt-container flex flex-col z-20'}>
            {/*close icon on right top corner*/}
            <div className={'flex justify-end w-full mr-4'} onClick={onClose}>
                <div className={'w-6 h-6'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className={'text-white'}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
            </div>
            <div className={'prompt-outer'}>
                <div className={'prompt-box'}>
                    <h1 className={'title'}>Take a Moment</h1>
                    <p className={'prompt-text'}>{prompt}</p>
                    <p className={'timer-text'}>Resting for: {timeLeft} seconds</p>
                </div>
            </div>
        </div>
    );
};

