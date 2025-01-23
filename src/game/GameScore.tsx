import {Game} from "stare/game/socket/types";

interface GameScoreProps {
    game?: Game
}

export const GameScore = ({game}: GameScoreProps) => {
    const isGameInWaiting = game?.status === 'waiting';

    const {players} = game || {};
    if (players === undefined || isGameInWaiting) return null;
    console.log("Players:", players, game);
    return (
        <div className="absolute left-5 top-1 p-1 bg-red-200 opacity-55 rounded">
            <h4 className="text-sm text-black text-start">Players:</h4>
            <div className="pl-3 text-black flex flex-col text-start">
                {Object.values(players).map((player: any) => (/* eslint-disable-line @typescript-eslint/no-explicit-any */
                    <span key={player.name} className="text-sm font-semibold">
                            {player.name}: {player.score}
                        </span>
                ))}
            </div>
        </div>
    )
}
