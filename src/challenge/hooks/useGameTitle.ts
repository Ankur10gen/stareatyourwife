import {useMemo} from "react";
import {ChallengeType, GameType} from "stare/home/gaming/GameType";

export const useGameTitle = (gameType: GameType | null, challengeType: ChallengeType | null) => {
    return useMemo(() => {
        switch (gameType) {
            case GameType.SINGLE_PLAYER:
                return 'Single Player';
            case GameType.MULTI_PLAYER:
                switch (challengeType) {
                    case ChallengeType.CHALLENGER:
                        return 'Give Challenge';
                    case ChallengeType.ACCEPTOR:
                        return 'Accept Challenge';
                }
        }
        return 'Game';
    }, [gameType, challengeType]);
}
