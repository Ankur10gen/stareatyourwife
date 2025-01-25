'use client'
import React from 'react';
import {SocketProvider} from "stare/game/socket/SocketProvider";
import {GamingSection} from "stare/game/GamingSection";

const ChallengePage = () => {
    return (
        <SocketProvider>
            <div className={'w-full min-h-screen overflow-auto'}>
                <GamingSection/>
            </div>
        </SocketProvider>
    );
};

export default ChallengePage;
