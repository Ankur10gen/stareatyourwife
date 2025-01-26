import {useSocket} from "stare/game/socket/SocketProvider";

export const GameScore = () => {
    const {game} = useSocket();
    const isGameInWaiting = game?.status === 'waiting';

    const {players} = game || {};
    if (players === undefined || isGameInWaiting) return null;
    console.log("Players----:", game);
    return (
        <div className="absolute left-5 top-5 p-1 bg-red-200 opacity-55 rounded">
            <h4 className="text-sm text-black text-start">StareCoins:</h4>
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
