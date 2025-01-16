import {useCallback, useState} from "react";

export const useChallenge = (): {
    acceptChallenge: (email: string) => void;
    successMsg: string | null;
    loading: boolean
} => {

    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const acceptChallenge = useCallback((email: string) => {
        if (email && email.includes("@")) {
            setLoading(true); // Set loading to true
            fetch("https://script.google.com/macros/s/AKfycbw3FwDQZRADv1gGBRn2zNE22_epKmsnQYQCR_E5rrAcN443tmuz4UOIBH5-JhdTuItDvA/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `email=${encodeURIComponent(email)}`,
            })
                .then((response) => response.text())
                .then((data) => {
                    setSuccessMsg(data);
                })
                .catch((error) => {
                    alert("An error occurred: " + error);
                })
                .finally(() => {
                    setLoading(false); // Reset loading to false
                });
        } else {
            alert("Please enter a valid email address.");
        }
    }, []);
    return {acceptChallenge, successMsg, loading};
}
