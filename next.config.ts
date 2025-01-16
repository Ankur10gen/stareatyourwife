import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true, // GitHub Pages does not support Next.js optimized images
    },
};

export default nextConfig;
