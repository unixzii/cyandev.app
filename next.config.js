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
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
