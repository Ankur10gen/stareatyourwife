import React, {useState} from "react";
import {useChallenge} from "stare/home/challenge/useChallenge";

export const ChallengeView = () => {

    const [email, setEmail] = useState<string>("");

    const {acceptChallenge, successMsg, loading} = useChallenge();

    //.challenge-section {
    //     background-color: #f1f8ff;
    //     padding: 20px;
    //     margin: 12px 0;
    //     border: 1px solid #4285f4;
    //     border-radius: 8px;
    // }
    // .success-message {
    //     font-size: 1.2em;
    //     color: #4CAF50;
    //     margin-top: 10px;
    // }
    return <div className="bg-blue-50 p-5 my-3 border border-solid border-blue-500 rounded-lg">
        <h3>Take The Stare Challenge 🫣</h3>
        {!successMsg ? (
            <div id="challengeInputs">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <button onClick={() => acceptChallenge(email)} disabled={loading}>
                    {loading ? "Loading..." : "Accept Challenge"} {/* Update button text */}
                </button>
            </div>
        ) : (
            <div id="successMessage" className="text-xl mt-3 text-green-500">
                {successMsg}
            </div>
        )}
    </div>
}
