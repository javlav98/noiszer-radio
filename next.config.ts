import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.theaudiodb.com",
      },
      {
        protocol: "https",
        hostname: "r2.theaudiodb.com",
      },
    ],
  },
};

export default nextConfig;
