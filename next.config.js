import createMDX from "@next/mdx";

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

export default withMDX(nextConfig);
