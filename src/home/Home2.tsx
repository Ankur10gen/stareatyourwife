'use client'
import React from "react";
import "../core/App.css";
import {BannerSection} from "stare/home/banner/banner-section/BannerSection";
import {useRouter} from "next/navigation";

const Home2: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <BannerSection
                onImageUploaded={() => {
                    router.push('/challenge');
                }}/>
        </>
    );
}

export default Home2;
