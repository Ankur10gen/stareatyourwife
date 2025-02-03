import React, {useCallback, useEffect, useRef, useState} from "react";
import './TypingText.css'
import '../banner/image-banner/ImageBanner.css'

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
    const isDenied = sessionStorage.getItem("audio-permission") === "denied";
    const [permission, setPermission] = useState<'enabled' | 'disabled' | 'denied'>(isDenied ? 'denied' : 'enabled');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle user permission to play audio
    const enableAudio = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setPermission('denied');
            }).catch(e => {
                setPermission('denied');
                console.log("Audio Play Blocked:", e)
            });
        }
    }, []);

    useEffect(() => {
        audioRef.current = new Audio("/safari_typing_text.mp3");

        // Try playing audio automatically
        audioRef.current.play().then(() => {
            setPermission('enabled');
        }).catch(() => {
            console.log("Audio Play Blocked");
            setPermission('disabled'); // Show enable button
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        if (permission === 'disabled')
            return;
        if (currentLine < missionText.length) {
            if (currentChar < missionText[currentLine].text.length) {
                setTimeout(() => {
                    setDisplayedText((prev) => prev + missionText[currentLine].text[currentChar]);
                    setCurrentChar((prev) => prev + 1);
                }, 50);
            } else {
                setTimeout(() => {
                    setDisplayedText((prev) => prev + "\n");
                    setCurrentLine((prev) => prev + 1);
                    setCurrentChar(0);
                }, missionText[currentLine].delay);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            onFinish(true);
        }
    }, [permission, currentChar, currentLine, onFinish]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [displayedText]);

    function cancelPermissionRequest() {
        sessionStorage.setItem("audio-permission", "denied");
        setPermission('denied');
    }

    return (
        <div className="typing-container">
            {permission === 'disabled' && (
                // <button className="enable-audio-btn" onClick={enableAudio}>Enable Sound 🔊</button>

                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h3>🎵 Enable Audio for the Best Experience!</h3>
                        <p style={{color: 'black'}}>
                            Sound enhances the experience and keeps the text animation in sync.
                            Click the button below to allow sound playback.
                        </p>
                        <div className={'flex justify-center'}>
                            <button style={{marginRight: 24}}
                                    onClick={() => cancelPermissionRequest()}
                            >Cancel
                            </button>
                            <button onTouchStart={enableAudio} onClick={enableAudio}>Enable Sound 🔊</button>
                        </div>
                    </div>
                </div>
            )}
            <pre className="typing-text">{displayedText}</pre>
        </div>
    );
};

export default TypingText;
