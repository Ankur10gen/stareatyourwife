import React from 'react';
import './BannerSection.css';
import TypingText from "stare/home/text/TypingText";

interface BannerSectionProps {
    onImageUploaded?: () => void
}

export const BannerSection = ({onImageUploaded}: BannerSectionProps) => {

    const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);

    const handleUpload = (file: File) => {

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                sessionStorage.setItem("stare-image", base64); // Store the image in session storage
                onImageUploaded?.();
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="kindle-screen" style={{height: '100vh'}}>
            <div className={'kindle-screen-overlay'}>
                <div className="kindle-content">
                    <h1 className="title"><a className={'underline'} href={'/about-us'}>StareGame</a> Starts With Their
                        Photo</h1>
                    <TypingText onFinish={setIsAnimationFinished}/>
                    {/*<p className="subtitle">Place one on your screen and let the challenge unfold.</p>*/}
                    {/*<p className="info">*/}
                    {/*    A seal of trust. Your photo stays private, never leaving your browser. It&#39;s as secure as it is*/}
                    {/*    on your phone right now.*/}
                    {/*</p>*/}
                    <label className={`upload-label ${isAnimationFinished ? "bounce" : ""}`}>
                        Place Photo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    handleUpload(file);
                                } else {
                                    alert("No file selected or file type is not supported.");
                                }
                            }}
                            className="upload-input"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};
