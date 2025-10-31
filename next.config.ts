import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 's2.coinmarketcap.com' },
      { hostname: 'upload.wikimedia.org' },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
