import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raftlabs-full-stack-developer.onrender.com',
        pathname: '/public/**',
      },
    ],
  },
};

export default nextConfig;
