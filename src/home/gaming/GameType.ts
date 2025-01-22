export enum GameType {
    SINGLE_PLAYER = 'SINGLE_PLAYER',
    MULTI_PLAYER = 'MULTI_PLAYER'
}

export const toGameType = (value: string | null): GameType | null => {
    if (value === GameType.SINGLE_PLAYER) return GameType.SINGLE_PLAYER;
    if (value === GameType.MULTI_PLAYER) return GameType.MULTI_PLAYER;
    return null;
}

export enum ChallengeType {
    CHALLENGER = 'CHALLENGER',
    ACCEPTOR = 'ACCEPTOR'
}

export const toChallengeType = (value: string | null): ChallengeType | null => {
    if (value === ChallengeType.CHALLENGER) return ChallengeType.CHALLENGER;
    if (value === ChallengeType.ACCEPTOR) return ChallengeType.ACCEPTOR;
    return null;
}
