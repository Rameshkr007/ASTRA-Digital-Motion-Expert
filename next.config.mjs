/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode helps catch hydration issues early
  reactStrictMode: true,

  // Image optimization — no external images used in this project
  images: {
    remotePatterns: [],
  },

  // Compiler options for better tree-shaking in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
