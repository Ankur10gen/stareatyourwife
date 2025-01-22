'use client'
import React from "react";

const AppContext = React.createContext({
    name: 'Ravi',
});

export const AppProvider = ({children}:{ children: React.ReactNode}) => {
    return <AppContext.Provider value={{name: 'Ravi'}}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = React.useContext(AppContext);
    if (!context) throw new Error("useApp must be used within a AppProvider");
    return context;
}
