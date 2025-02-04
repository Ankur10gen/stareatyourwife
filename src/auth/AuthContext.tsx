'use client';
import React, {createContext, ReactNode, useState} from "react";

export interface UserData {
    username: string;
    token: string;
}

interface AuthContextType {
    user: UserData | null;
    isLoggedIn: boolean;
    onLogin: (userData: UserData) => void;
    onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const storedUser = localStorage.getItem("authUser");
    const userData = storedUser && JSON.parse(storedUser);
    const [user, setUser] = useState<UserData | null>(userData);

    const isLoggedIn = !!user;

    const onLogin = (userData: { username: string, token: string }) => {
        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
    };

    const onLogout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
    };

    return (
        <AuthContext.Provider value={{user, isLoggedIn, onLogin, onLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
