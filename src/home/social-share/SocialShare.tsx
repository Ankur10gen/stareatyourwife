import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import React, {useCallback} from "react";
import {useSocialShare} from "stare/home/social-share/useSocialShare";
import {useScreenshot} from "stare/core/hooks/useScreenshot";
import {useDownload} from "stare/core/hooks/useDownload";
import {useCopyHashtag} from "stare/core/hooks/useCopy";
import './SocialShare.css';

enum SocialMedia {
    INSTAGRAM = "instagram",
    FACEBOOK = "facebook",
    TWITTER = "twitter"
}

interface SocialShareProps {
    screenshotRef?: React.RefObject<HTMLDivElement | null>
}

export const SocialShare = ({screenshotRef}: SocialShareProps) => {

    const {shareOnInstagram, shareOnFacebook, shareOnTwitter} = useSocialShare();
    const {takeScreenshot} = useScreenshot();
    const {download} = useDownload();
    const {copyHashtag} = useCopyHashtag();

    const downloadImage = useCallback(async () => {
        if (screenshotRef?.current) {
            const imageUrl = await takeScreenshot(screenshotRef?.current);
            download(imageUrl);
        }
    }, [download, screenshotRef, takeScreenshot]);

    const shareOnSocialMedia = useCallback(async (socialMedia: SocialMedia) => {
        await downloadImage();
        copyHashtag();
        switch (socialMedia) {
            case SocialMedia.INSTAGRAM:
                shareOnInstagram();
                break;
            case SocialMedia.FACEBOOK:
                shareOnFacebook();
                break;
            case SocialMedia.TWITTER:
                shareOnTwitter();
                break;
        }
    }, [copyHashtag, downloadImage, shareOnFacebook, shareOnInstagram, shareOnTwitter])

    return <div className="share-section">
        <div className="social-icons">
            <span className="icon instagram"
                  onClick={() => shareOnSocialMedia(SocialMedia.INSTAGRAM)}>
                <FontAwesomeIcon icon={faInstagram}/>
            </span>
            <span className="icon facebook"
                  onClick={() => shareOnSocialMedia(SocialMedia.FACEBOOK)}>
                <FontAwesomeIcon icon={faFacebook}/>
            </span>
            <span className="icon twitter"
                  onClick={() => shareOnSocialMedia(SocialMedia.TWITTER)}>
                <FontAwesomeIcon icon={faTwitter}/>
            </span>
        </div>
    </div>
}
