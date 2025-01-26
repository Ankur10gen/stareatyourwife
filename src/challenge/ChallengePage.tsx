'use client'
import React from 'react';
import {SocketProvider} from "stare/game/socket/SocketProvider";
import {GamingSection} from "stare/game/GamingSection";

const ChallengePage = () => {
    return (
        <SocketProvider>
            <div className={'w-full h-full overflow-auto'}>
                <GamingSection/>
            </div>
        </SocketProvider>
    );
};

export default ChallengePage;
