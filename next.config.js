/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 300,
      static: 900
    }
  }
};

module.exports = nextConfig
