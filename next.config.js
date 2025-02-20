import createMDX from "@next/mdx";
import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 300,
      static: 900,
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.raw\..+$/,
      type: "asset/source",
    });
    return config;
  },
};

const withMDX = createMDX({});
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withMDX(nextConfig));
