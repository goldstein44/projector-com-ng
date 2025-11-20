/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  // IMPORTANT: disable Next.js image optimizer to serve static images from /public directly.
  // This avoids the internal fetch that was causing 400 responses from the optimizer.
  images: {
    unoptimized: true,
    // keep remotePatterns/domains in case you later want to load images from the backend domain.
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "app.projectorlekki.com.ng",
      },
    ],
    domains: ["app.projectorlekki.com.ng"],
  },

  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  },
};

module.exports = nextConfig;