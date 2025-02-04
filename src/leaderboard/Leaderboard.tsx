import {useEffect, useState} from "react";
import './Leaderboard.css';
import {useAuth} from "stare/auth/AuthContext";

interface Challenge {
    challenge_id: string;
    user_id: string;
    couple_name: string;
    score: string;
    created_at: string;
}

export const Leaderboard = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {user} = useAuth();
    console.log("Leaderboard:user:", user);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await fetch(
                    "https://stare-game.ap-south-1.elasticbeanstalk.com/api/challenges/list",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${user?.token}`, // Assuming token is stored in localStorage
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    setError("Failed to fetch challenges");
                }

                const data = await response.json();
                setChallenges(data.challenges);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges().catch(console.error);
    }, [user?.token]);

    return (
        <div className="challenge-list">
            <h3>Challenge History</h3>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <ul>
                    {challenges.map((challenge) => (
                        <li key={challenge.challenge_id} className="challenge-item">
                            <p><strong>Couple:</strong> {challenge.couple_name}</p>
                            <p><strong>Score:</strong> {challenge.score}</p>
                            <p><strong>Date:</strong> {new Date(challenge.created_at).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
