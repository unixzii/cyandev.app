import * as path from "node:path";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog/rss.xml",
          destination: "/rss",
        },
      ],
      fallback: [
        {
          source: "/:locale/posts/:id",
          destination: "/:locale/post/:id",
        },
        {
          source: "/:locale/:path*",
          destination: "/:locale/404",
        },
      ],
    };
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
const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));
