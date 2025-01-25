import {Game} from "stare/game/socket/types";
import {useGameSocket} from "stare/game/socket/useGameSocket";

interface GameResultProps {
    game?: Game,
    gameId: string,
    isSinglePlayer: boolean,
    isChallenger?: boolean
}

export const GameResult = ({gameId, isSinglePlayer, isChallenger}: GameResultProps) => {
    const {game, restartGame} = useGameSocket();
    const {result, challenge} = game || {};
    if (!result) return null;
    console.log("Game result:", result, game);

    const onReplay = () => {
        restartGame(gameId, isSinglePlayer);
    }

    return (
        <div
            className="absolute bottom-20 left-0 right-0 p-2 bg-red-400 shadow-lg">
            <h2 className="text-lg font-bold text-center">{result.message}</h2>
            <p className="text-center text-md">
                Final Score: <span className="font-semibold">{result.score}</span>
            </p>
            {challenge && <p className="text-center text-sm">
                Challenge: <span className="text-sm">{challenge}</span>
            </p>}
            {isChallenger && <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={onReplay}>
                Play Again
            </button>}
        </div>
    )
}
