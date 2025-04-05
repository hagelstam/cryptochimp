import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "s2.coinmarketcap.com" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
