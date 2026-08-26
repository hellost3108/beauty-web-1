import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  agentRules: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
