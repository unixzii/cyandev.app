import * as path from "node:path";
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
      resourceQuery: /raw/,
      type: "asset/source",
    });
    config.resolveLoader.alias["post-catalog-loader"] = path.resolve(
      "./loaders/post-catalog-loader.js",
    );
    return config;
  },
};

const withMDX = createMDX({});
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withMDX(nextConfig));
