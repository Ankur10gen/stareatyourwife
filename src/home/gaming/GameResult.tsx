import {Game} from "stare/game/socket/types";

interface GameResultProps {
    game?: Game
}

export const GameResult = ({game}: GameResultProps) => {
    const {result} = game || {};
    if (!result) return null;
    console.log("Game result:", result, game);

    return (
        <div
            className="absolute top-2/3 left-0 right-0 transform p-2 bg-red-400 shadow-lg">
            <h2 className="text-lg font-bold text-center">{result.message}</h2>
            <p className="text-center text-md">
                Final Score: <span className="font-semibold">{result.score}</span>
            </p>
        </div>
    )
}
