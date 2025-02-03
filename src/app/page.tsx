'use client'
import dynamic from "next/dynamic";

const Home2 = dynamic(() => import('stare/home/Home2'), {ssr: false});

export default Home2
