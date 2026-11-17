import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import redirects from "./redirects.json";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true, disableStaticImages: true },
  async redirects() {
    return redirects;
  },
  async rewrites() {
    return [
      { source: "/api/public/newsletter-subscribe", destination: "/api/newsletter" },
      { source: "/api/public/contact", destination: "/api/contact" },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg|pdf)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
