import React from "react";
import './ImageView.css';

type GameBackgroundProps = {
    imageUrl: string | null
}
export const GameBackground = ({imageUrl}: GameBackgroundProps) => {
    return <div id="imageContainer" className={`image ${imageUrl ? 'border rounded-lg mx-4 mt-2' : ''}`}>
        {imageUrl && <img src={imageUrl} alt="Uploaded Image"/>}
    </div>
}
