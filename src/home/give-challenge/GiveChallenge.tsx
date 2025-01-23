import React, {useCallback, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {ChallengeType, GameType} from "stare/game/GameType";
import './GiveChallenge.css'
import {gsap} from "gsap";
import {CSSPlugin} from "gsap/CSSPlugin";

gsap.registerPlugin(CSSPlugin);

export const GiveChallenge = () => {
    const router = useRouter();
    const buttonGiveRef = useRef(null);
    const buttonAcceptRef = useRef(null);
    const buttonSingleRef = useRef(null);
    const backgroundRef = useRef(null);

    const applyAnimation = useCallback((buttonRef: React.RefObject<null>) => {
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
    }, []);

    useEffect(() => {
        applyAnimation(buttonGiveRef);
        applyAnimation(buttonAcceptRef);
        // applyAnimation(buttonGiveRef);
        gsap.to(backgroundRef.current, {
            backgroundPosition: "200% 0",
            duration: 8,
            repeat: -1,
            ease: "linear",
        });
    }, [applyAnimation]);

    const handleGamePlay = useCallback((gameType: GameType, challengeType?: ChallengeType) => {
        if (gameType === GameType.SINGLE_PLAYER) {
            router.push(`/challenge?game_type=${gameType}`);
            return
        }

        switch (challengeType) {
            case ChallengeType.CHALLENGER:
                router.push(`/challenge?game_type=${gameType}&challenge_type=${challengeType}`);
                break;
            case ChallengeType.ACCEPTOR:
                router.push(`/challenge?game_type=${gameType}&challenge_type=${challengeType}`);
                break;
        }
    }, [router]);

    return <div ref={backgroundRef}
                className="bg-blue-50 py-5 my-3 border border-solid border-blue-500 rounded-lg give-challenge">
        <div className={'flex flex-col'}>
            {/*<div>*/}
            <button ref={buttonGiveRef}
                    onClick={() => handleGamePlay(GameType.MULTI_PLAYER, ChallengeType.CHALLENGER)}>Give Challenge
            </button>
            <button ref={buttonAcceptRef}
                    onClick={() => handleGamePlay(GameType.MULTI_PLAYER, ChallengeType.ACCEPTOR)}>Accept Challenge
            </button>
            {/*</div>*/}
            <button ref={buttonSingleRef}
                    onClick={() => handleGamePlay(GameType.SINGLE_PLAYER)}>Single Player
            </button>
        </div>
    </div>
}
