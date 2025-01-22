import React from "react";

type AppHeaderProps = {
    title: string;
}

export const AppHeader = ({title}: AppHeaderProps) => {
    return <header className="w-full py-4 bg-gray-50 border-b border-solid border-gray-100 fixed top-0 left-0 z-20">
        <span className={"text-blue-500 text-base"}>
            {title}
        </span>
    </header>
}
