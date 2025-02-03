'use client'
import dynamic from "next/dynamic";

const Leaderboard = dynamic(() => import('stare/leaderboard/Leaderboard'), {ssr: false});

const Page = () => {
    return (
        <Leaderboard/>
    );
}
export default Page
