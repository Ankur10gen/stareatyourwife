'use client'
import {Suspense} from "react";
import dynamic from "next/dynamic";

const ChallengePage = dynamic(() => import('stare/challenge/ChallengePage'), {ssr: false});

const Page = () => {
    console.log("ChallengePage----:");
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChallengePage/>
        </Suspense>
    );
}
export default Page
