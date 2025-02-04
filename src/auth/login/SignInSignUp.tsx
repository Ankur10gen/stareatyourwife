import React, {useState} from "react";
import "../Auth.css";
import {useAuth} from "stare/auth/AuthContext";

const API_URL = "https://stare-game.ap-south-1.elasticbeanstalk.com/api/user"; // Change this if needed

export const SignInSignUp = () => {
    const {onLogin} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            if (isSignUp) {
                // Signup Request
                const res = await fetch(`${API_URL}/signup`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username, password}),
                });

                const data = await res.json();
                if (!res.ok) {
                    setError(data.error.message || "Signup failed");
                } else {
                    setIsSignUp(false);
                }
            } else {
                // Login Request
                const res = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username, password}),
                });

                const data = await res.json();
                if (!res.ok) {
                    setError(data.error.message || "Invalid credentials");
                } else {
                    onLogin({username, token: data.token});
                }
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                console.error("An unknown error occurred", e);
            }
        }
    };

    return (
        <div className={'h-full flex justify-center items-center'}>
            <div className="auth-container">
                <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {isSignUp && (
                        <input
                            type="password"
                            placeholder="Re-enter Password"
                            value={reEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                            required
                        />
                    )}
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>

                    <p className="switch-text">
                        {isSignUp ? (
                            <>
                                Already have an account?{" "}
                                <span onClick={() => setIsSignUp(false)} className="switch-link">
                                Sign In
                            </span>
                            </>
                        ) : (
                            <>
                                Don&#39;t have an account?{" "}
                                <span onClick={() => setIsSignUp(true)} className="switch-link">
                                Sign Up
                            </span>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};
