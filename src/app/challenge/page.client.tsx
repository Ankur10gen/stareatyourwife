'use client'

import ChallengePage from "stare/challenge/ChallengePage";
import {AuthProvider} from "stare/auth/AuthContext";

const PageClient = () => {
    return (
        <AuthProvider>
            <ChallengePage/>
        </AuthProvider>
    );
}
export default PageClient
