import {ChallengePage} from "stare/challenge/ChallengePage";
import {Suspense} from "react";

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChallengePage/>
        </Suspense>
    );
}
export default Page
