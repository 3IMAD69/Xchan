import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  /* config options here */
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      new URL("https://i.4cdn.org/**"),
      new URL("https://s.4cdn.org/**"),
    ],
  },
};

export default nextConfig;
