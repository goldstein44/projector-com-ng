// frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // Keep localhost for dev
      },
      {
        protocol: "https",
        hostname: "api.projectorlekki.com.ng", // Your production backend domain
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  },
};

module.exports = nextConfig;