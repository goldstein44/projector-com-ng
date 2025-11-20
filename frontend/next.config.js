/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  // Disable Next.js image optimization for static public images
  // This ensures /public/products/... works without 400 errors
  images: {
    unoptimized: true,

    // Keep remotePatterns/domains if you later need backend-hosted images
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // dev backend
      },
      {
        protocol: "https",
        hostname: "app.projectorlekki.com.ng", // prod backend
      },
    ],
    domains: ["app.projectorlekki.com.ng"], // optional, for external images
  },

  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  },
};

module.exports = nextConfig;