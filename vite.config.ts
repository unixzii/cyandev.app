import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import rehypePrettyCode, { Options } from "rehype-pretty-code";

import postProvider from "./plugins/post-provider";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: {
              light: "github-light-default",
              dark: "github-dark-default",
            },
          } satisfies Options,
        ],
      ],
    }),
    postProvider(path.resolve(import.meta.dirname, "data/posts")),
  ],
});
