import React, { useState, useContext } from "react";
import {AuthContext} from "stare/auth/AuthContext";

const SignInSignUp = () => {
    const { login } = useContext(AuthContext)!;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");

        if (isSignUp) {
            // Sign Up Logic
            if (password !== reEnterPassword) {
                setError("Passwords do not match.");
                return;
            }
            storedUsers[username] = password;
            localStorage.setItem("users", JSON.stringify(storedUsers));
            login(username); // Auto-login after signup
        } else {
            // Sign In Logic
            if (!storedUsers[username]) {
                setIsSignUp(true); // Prompt for sign-up if account doesn't exist
            } else if (storedUsers[username] !== password) {
                setError("Incorrect password.");
            } else {
                login(username);
            }
        }
    };

    return (
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
            </form>
        </div>
    );
};

export default SignInSignUp;
