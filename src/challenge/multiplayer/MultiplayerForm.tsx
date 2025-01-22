import React, {useState} from "react";

type MultiplayerFormProps = {
    onStartGame: (gameId: string, playerName: string, challenge: string) => void,
    onJoinGame: (gameId: string, playerName: string) => void,
    gameType?: string | null | undefined
}
export const MultiplayerForm = ({onStartGame, onJoinGame, gameType}: MultiplayerFormProps) => {

    const [gameId, setGameId] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [challenge, setChallenge] = useState("");

    const handleJoinGame = () => {
        console.log("Joining game", gameId, playerName);
        if (gameType == 'give_challenge') {
            onStartGame(gameId, playerName, challenge);
        } else {
            onJoinGame(gameId, playerName);
        }
    };

    const buttonText = gameType == 'give_challenge' ? 'Give Challenge' : 'Accept Challenge';
    return <div
        className="flex flex-col items-center p-4 border rounded-lg m-4 border-gray-200">
        <input
            type="text"
            placeholder="Enter Game ID"
            onChange={(e) => setGameId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {gameType == 'give_challenge' && <>
            <textarea
                id="challenge"
                placeholder="Enter the challenge you want to give..."
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                rows={2} // Makes it multiline
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-sm text-gray-500 text-start ml-2 flex">
                Set the ultimate challenge for your partner and see if they can conquer it! 🎯💖 What’s your dare, dream, or test of love? Type it above!
            </span>
        </>
        }
        <button
            onClick={handleJoinGame}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >{buttonText}</button>
    </div>
}
