import React, {useEffect, useRef, useState} from "react";
import './TypingText.css'

const missionText = [
    {text: "INITIALIZING STARE PROTOCOL...", delay: 500},
    {text: "SCANNING FOR LOVE SIGNALS...", delay: 700},
    {text: "ANALYZING EYE CONTACT POTENTIAL...", delay: 1500},
    {text: "WARNING: BLINKING IS A SIGN OF WEAKNESS...", delay: 400},
    {text: "", delay: 200},
    {text: "MISSION OBJECTIVE:", delay: 600},
    {text: "OUTSTARE YOUR LOVED ONE. WIN THE STAKE. RULE THE MOMENT.", delay: 800},
    {text: "", delay: 200},
    {text: "STEP 1: Upload a photo of your loved one.", delay: 1200},
    {text: "STEP 2: Lock eyes. No blinking. No looking away.", delay: 2000},
    {text: "STEP 3: Catch the love, spare the yuck.", delay: 700},
    {text: "", delay: 200},
    {text: "VICTORY CONDITIONS:", delay: 1000},
    {text: "- They blink first? You win.", delay: 1500},
    {text: "- You blink first? They win.", delay: 1500},
    {text: "- Both of you laughing? That’s true love.", delay: 1500},
    {text: "", delay: 200},
    {text: "READY?", delay: 1200},
    {text: "STARE TO BEGIN.", delay: 100}
];

const TypingText = ({onFinish}: { onFinish: (isFinished: boolean) => void }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null); // Ref for scrolling
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {

        audioRef.current = new Audio('/typing_text.ogg');
        audioRef.current.play().then(r => console.log(r)).catch(e => console.log(e));

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        if (currentLine < missionText.length) {
            if (currentChar < missionText[currentLine].text.length) {
                setTimeout(() => {
                    setDisplayedText((prev) => prev + missionText[currentLine].text[currentChar]);
                    setCurrentChar((prev) => prev + 1);
                }, 50); // Typing speed
            } else {
                // Use line-specific delay
                setTimeout(() => {
                    setDisplayedText((prev) => prev + "\n");
                    setCurrentLine((prev) => prev + 1);
                    setCurrentChar(0);
                }, missionText[currentLine].delay);
            }
        } else {
            onFinish(true);
        }
    }, [currentChar, currentLine, onFinish]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [displayedText]);

    return (
        <>
            <div ref={containerRef} className={"typing-container"}>
                <pre className={"typing-text"}>{displayedText}</pre>
            </div>
        </>
    );
};
export default TypingText;
