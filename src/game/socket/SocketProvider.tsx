'use client'
import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Game, GameStatus} from "stare/game/socket/types";

interface SocketContextType {
    socket: Socket | null;
    game: Game;
    setGame: (game: Game) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    // const socketRef = useRef<Socket|null>(null);
    const [game, setGame] = useState<Game>({
        players: {},
        speed: 1,
        challenge: null,
        result: null,
        status: 'waiting' as GameStatus,
        error: null,
        prompt: null,
        duration: 120,
    });

    useEffect(() => {
        const s = io("https://stare-at-your-wife1.ap-south-1.elasticbeanstalk.com");
        // const s = io("http://localhost:8080");
        console.log("Socket connected");
        setSocket(s);
        return () => {
            s.disconnect()
            console.log("Socket disconnected");
            // socketRef.current?.disconnect();
        };
    }, []);

    return <SocketContext.Provider
        value={{socket: socket, setGame, game}}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocket must be used within a SocketProvider");
    return context;
};
