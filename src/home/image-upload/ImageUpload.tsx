import React, {useCallback, useState} from "react";
import './ImageUpload.css';

interface ImageUploadProps {
    boundingRect?: React.RefObject<DOMRect | undefined>
    onImageUploaded?: () => void
}

export const ImageUpload = ({boundingRect, onImageUploaded}: ImageUploadProps) => {

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const setImageUrl = useCallback((imageUrl: string | null) => {
        setUploadedImage(imageUrl);
        onImageUploaded?.();

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
        <input type="text" id="imageUrl" placeholder="Enter the image URL"/>
        <button onClick={showImage}>Show Image</button>
        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload}/>

        {/*add border class if uploadImage is not falsy*/}
        <div id="imageContainer" className={`image ${uploadedImage ? 'border' : ''}`}>
            {uploadedImage && <img src={uploadedImage} alt="Uploaded Image"/>}
        </div>
    </>
}
