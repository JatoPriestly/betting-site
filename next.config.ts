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
      {
        protocol: "https",
        hostname: "cdd7e2ac9b2ced2a860707e1b757453a.r2.cloudflarestorage.com",
      },
    ],

  },
};

export default nextConfig;
