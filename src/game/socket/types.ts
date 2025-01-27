export interface Player {
    name: string;
    score: number;
}

export interface Game {
    players: Record<string, Player>;
    speed: number;
    challenge: string | null;
    result: GameResult | null;
    status: GameStatus;
    error: string | null;
    prompt: string | null;
    duration: number | null;

}

export interface GameResult {
    winner: string;
    score: number;
    message: string;
}

export enum GameStatus {
    waiting = "waiting",
    joined = "joined",
    started = "started",
    finished = "finished",
}

export enum GameEvent {
    onStateChanged = "gameState"
}

export enum GameAction {
    createGame = "createGame",
    restartGame = "restartGame",
    startGame = "startGame",
    setSpeed = "setSpeed",
    gameOver = "gameOver",
    joinGame = "joinGame",
}
