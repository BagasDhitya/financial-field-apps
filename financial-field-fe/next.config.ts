import type { NextConfig } from "next";

const cmsUrl = new URL(
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: cmsUrl.protocol.replace(":", "") as "http" | "https",
        hostname: cmsUrl.hostname,
        port: cmsUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
