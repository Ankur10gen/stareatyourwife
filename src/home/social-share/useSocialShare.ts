import {useCallback} from "react";

export const useSocialShare = (): {
    shareOnInstagram: () => void,
    shareOnFacebook: () => void,
    shareOnTwitter: () => void
} => {
    const shareOnInstagram = useCallback(async () => {
        window.open('https://www.instagram.com/create/story/', '_blank');
    }, []);

    const shareOnFacebook = useCallback(async () => {
        const facebookSharer = `https://www.facebook.com/sharer.php`;
        window.open(facebookSharer, "_blank");
    }, []);

    const shareOnTwitter = useCallback(async () => {
        const twitterSharer = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            "#stareatyourwife"
        )}`;

        window.open(twitterSharer, "_blank");
    }, []);

    return {shareOnInstagram, shareOnFacebook, shareOnTwitter};
}
