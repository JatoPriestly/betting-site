import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore - Adding allowedDevOrigins to permit access from local network IP
  allowedDevOrigins: ['192.168.1.110', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
