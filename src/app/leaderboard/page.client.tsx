'use client'

import {AuthContext, AuthProvider} from "stare/auth/AuthContext";
import {Leaderboard} from "stare/leaderboard/Leaderboard";
import {SignInSignUp} from "stare/auth/login/SignInSignUp";

const PageClient = () => {
    return (
        <AuthProvider>
            <AuthContext.Consumer>
                {(value) =>
                    value?.isLoggedIn == true
                        ? <Leaderboard/> : <SignInSignUp/>
                }
            </AuthContext.Consumer>
        </AuthProvider>
    );
}
export default PageClient
