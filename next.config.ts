import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['f1ossfzpax.ufs.sh'], // Add the hostname from your uploadthing URLs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ufs.sh', // This will allow any subdomain of ufs.sh
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
