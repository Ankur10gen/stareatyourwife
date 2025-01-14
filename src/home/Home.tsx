'use client'
import React, { useState } from "react";
import "./App.css";

const Home: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const showImage = () => {
        const url = (document.getElementById("imageUrl") as HTMLInputElement)?.value;
        if (url) {
            setImageUrl(url);
        } else {
            alert("Please enter a valid image URL.");
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imgSrc = URL.createObjectURL(file);
            setUploadedImage(imgSrc);
        } else {
            alert("No file selected or file type is not supported.");
        }
    };

    const acceptChallenge = () => {
        if (email && email.includes("@")) {
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
                });
        } else {
            alert("Please enter a valid email address.");
        }
    };

    const searchRestaurants = () => window.open("https://www.google.com/search?q=restaurants+near+me", "_blank");
    const searchMovies = () => window.open("https://www.google.com/search?q=movies+near+me", "_blank");

    return (
        <div>
            <div className="top-banner">
                <a href="StareAtYourWife.com" target="_blank" rel="noopener noreferrer">
                    Thousands Have Stared At Their Partners On This Website
                </a>
            </div>
            <div className="container">
                <h1>
                    This Valentine
                    <a
                        href="https://twitter.com/intent/tweet?text=This%20Valentine%E2%80%99s%20Day%2C%20spend%20time%20that%20truly%20matters.%20Special%20offers%20await%20on%20StareAtYourWife.com.%20%23ValentinesDay%20%23StareAtYourWife"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        #StareAtYourWife
                    </a>
                </h1>
                <h2>No Matter If You&#39;re In The Office Or At Home</h2>
                <h3>Now You Have The Freedom To Stare At Your Partner For Hours</h3>
                <h3>At StareAtYourWife.com, We Take Pride In Connecting People</h3>
                <h3>And Making The World A Better Place</h3>
                <h2>Give Us Some Love ❤️ & Share With Friends</h2>
                <input type="text" id="imageUrl" placeholder="Enter the image URL" />
                <button onClick={showImage}>Show Image</button>
                <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
                <div id="imageContainer">
                    {imageUrl && <img src={imageUrl} alt="Partner's Photo" />}
                </div>
                <div id="uploadImageContainer">
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded Image" />}
                </div>
                <div className="challenge-section">
                    <h3>Take The Stare Challenge 🫣</h3>
                    {!successMsg ? (
                        <div id="challengeInputs">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <button onClick={acceptChallenge}>Accept Challenge</button>
                        </div>
                    ) : (
                        <div id="successMessage" className="success-message">
                            {successMsg}
                        </div>
                    )}
                </div>
                <button onClick={searchRestaurants}>Find Restaurants Near Me</button>
                <button onClick={searchMovies}>Find Movies Near Me</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <iframe
                    src="https://www.youtube.com/embed/oYsadFe6iL4?si=VH_ddsJqYrZUIQhR"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
            <h4>
                <i>Note: All code is running on your browser & doesn&#39;t store any data or images</i>
            </h4>
            <h4>
                <i>
                    You can check, contribute or fork the <a href="https://github.com/Ankur10gen/stareatyourwife">code
                    on github here</a>
                </i>
            </h4>
        </div>
    );
};

export default Home;
