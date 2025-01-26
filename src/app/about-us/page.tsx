'use client'
import dynamic from "next/dynamic";

const AboutUs = dynamic(() => import('stare/about-us/AboutUs'), {ssr: false});

const Page = () => {
    return (
        <AboutUs/>
    );
}
export default Page
