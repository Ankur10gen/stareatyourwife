'use client'
import React from 'react';
import {useSearchParams} from "next/navigation";
// import {GamingSection} from "stare/home/gaming/GamingSection";
import {toChallengeType, toGameType} from "stare/home/gaming/GameType";
import {SocketProvider} from "stare/game/socket/SocketProvider";
import {GamingSection} from "stare/home/gaming/GamingSection";

export const ChallengePage = () => {
    const params = useSearchParams();
    const gameTypeStr = params.get('game_type');
    const challengeTypeStr = params.get('challenge_type');

    const gameType = toGameType(gameTypeStr);
    const challengeType = toChallengeType(challengeTypeStr);

    return (
        <SocketProvider>
            <div className={'w-full min-h-screen overflow-auto'}
                 style={
                     {background: "linear-gradient(135deg, #000428, #004e92)"}
                 }>
                <GamingSection gameType={gameType} challengeType={challengeType}/>
            </div>
        </SocketProvider>
    );
};
