import React, {useCallback, useState} from "react";
import './ImageUpload.css';
import FeatherIcon from 'feather-icons-react';

interface ImageUploadProps {
    boundingRect?: React.RefObject<DOMRect | undefined>
    onImageUploaded?: (isAdded: boolean) => void
    showControls?: boolean
}

export const ImageUpload = ({showControls, boundingRect, onImageUploaded}: ImageUploadProps) => {

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const setImageUrl = useCallback((imageUrl: string | null) => {
        setUploadedImage(imageUrl);
        onImageUploaded?.(imageUrl != null);

        if (imageUrl == null) {
            return
        }

        const element = document.getElementById("imageContainer");
        setTimeout(() => {
            element?.scrollIntoView({behavior: "smooth", block: "center"});
        }, 100);

        setTimeout(() => {
            if (boundingRect) {
                boundingRect.current = element?.getBoundingClientRect();
            }
        }, 300)
    }, [boundingRect, onImageUploaded]);

    const showImage = useCallback(() => {
        const url = (document.getElementById("imageUrl") as HTMLInputElement)?.value;
        if (url) {
            setImageUrl(url);
        } else {
            alert("Please enter a valid image URL.");
        }
    }, [setImageUrl]);

    const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imgSrc = URL.createObjectURL(file);
            setImageUrl(imgSrc);
        } else {
            alert("No file selected or file type is not supported.");
        }
    }, [setImageUrl]);

    return <>
        <div id="imageContainer" className={`image ${uploadedImage ? 'border rounded-lg mx-4 mt-2' : ''}`}>
            {uploadedImage && <img src={uploadedImage} alt="Uploaded Image"/>}
        </div>
        {/*retake icon if image is uploaded*/}
        {uploadedImage &&
            <div className={'absolute right-5 top-2'}
                 onClick={() => setImageUrl(null)}>
                <FeatherIcon icon="upload"/>
            </div>}

        {showControls && !uploadedImage && <div
            className={'flex flex-col sm:flex-row border rounded-lg border-gray-200 m-4 p-2'}>
            <div>
                <input
                    className={'m-2 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'}
                    type="text"
                    id="imageUrl"
                    placeholder="Enter the image URL"/>
                <button onClick={showImage}>Show Image</button>
            </div>
            <span className={'text-center mx-2 text-base font-bold text-gray-500 sm:hidden'}>------- OR -------</span>
            <input
                className={'m-2 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'}
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}/>
        </div>}
    </>
}
