import React, {useRef, useState} from "react";
import {ImageUpload} from "stare/home/image-upload/ImageUpload";
import {SocialShare} from "stare/home/social-share/SocialShare";
import './GamingSection.css';
import {GameControls} from "stare/home/gaming/GameControls";

export const GamingSection = () => {

    const [score, setScore] = useState<number>(0);
    const [showBubble, setShowBubble] = useState<boolean>(false);
    const [bubblePosition, setBubblePosition] = useState<{ top: number; left: number }>({top: 0, left: 0});
    const [challengeOver, setChallengeOver] = useState<boolean>(false);

    const bubbleTimeout = useRef<string | number | NodeJS.Timeout | null | undefined>(null);
    const boundingRect = useRef<DOMRect>(undefined);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const screenshotRef = useRef<HTMLDivElement>(null);
    const [bubbleState, setBubbleState] = useState<string>('');
    const [speed, setSpeed] = useState<number>(1);

    const startStareChallenge = () => {
        if (!isImageUploaded) {
            alert("Please upload a photo of your partner first");
            return;
        }
        setScore(0);
        setChallengeOver(false);
        spawnBubble();
    };

    const spawnBubble = () => {
        if (challengeOver) return;

        const randomLeft = Math.random() * 35 + 30;
        const randomTop = Math.random() * 10 + 10;

        setBubblePosition({top: randomTop, left: randomLeft});
        setShowBubble(true);

        if (bubbleTimeout.current != null) {
            clearTimeout(bubbleTimeout.current);
            console.log('timer cancelled')
        }
        // Remove bubble after 2 seconds if not clicked
        bubbleTimeout.current = setTimeout(() => {
            console.log('timeout called')
            setShowBubble(false);
            setChallengeOver(true);
            // spawnBubble()
        }, 1000 * (4 / speed)); // 1 minute
    };

    const handleBubbleClick = (event: React.MouseEvent<HTMLDivElement>) => {

        const bubbleElement = event.currentTarget as HTMLDivElement;
        const rect = bubbleElement.getBoundingClientRect();

        // Freeze the position by converting percentages to pixels
        const top = bubbleElement.offsetParent?.getBoundingClientRect().top;
        const left = bubbleElement.offsetParent?.getBoundingClientRect().left;
        const frozenTop = rect.top - (top ?? 0);
        const frozenLeft = rect.left - (left ?? 0);

        // Update the state with exact pixel positions and set "burst" state
        setBubblePosition({top: frozenTop, left: frozenLeft});
        setBubbleState('burst');

        setTimeout(() => {
            setBubbleState('');
            setShowBubble(false);
        }, 300);

        setScore((prevScore) => prevScore + 1);
        if (bubbleTimeout.current != null) {
            clearTimeout(bubbleTimeout.current);
            console.log('timer cancelled')
        }
        setTimeout(() => {
            if (!challengeOver) {
                spawnBubble();
            }
        }, 1000 * 2 / speed);
    };

    return <>
        <div style={{position: 'relative'}} ref={screenshotRef}>
            <ImageUpload boundingRect={boundingRect} onImageUploaded={() => setIsImageUploaded(true)}/>
            {isImageUploaded && <div className={'flex justify-between items-center'}>
                {
                    !challengeOver
                        ? <>
                            <button onClick={startStareChallenge}>Start Challenge</button>
                            <GameControls onSpeedChange={setSpeed} speed={speed}/>
                        </>
                        : <>
                            <button onClick={startStareChallenge}>Restart Challenge</button>
                            <SocialShare screenshotRef={screenshotRef}/>
                        </>
                }
            </div>}

            <div className={'flex'}>
                {
                    challengeOver && <h3>Challenge is Over!</h3>
                }
                {/*add space here*/}
                <div style={{width: 10}}/>
                <h2>Score: {score}</h2>
            </div>

            {showBubble && (
                <div
                    className="bubble"
                    data-state={bubbleState}
                    style={{
                        top: bubbleState === 'burst' ? `${bubblePosition.top}px` : `${bubblePosition.top}%`,
                        left: bubbleState === 'burst' ? `${bubblePosition.left}px` : `${bubblePosition.left}%`,
                        animationDuration: bubbleState === 'burst' ? `.3s` : `${4 / speed}s`,
                    }}
                    onClick={handleBubbleClick}
                >
                </div>
            )}
        </div>
    </>
}
