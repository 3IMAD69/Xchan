import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [new URL('https://i.4cdn.org/**')],
    },
};

export default nextConfig;
