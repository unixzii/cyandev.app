import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code";

import { RemarkUrlRewriter } from "./plugins/url-rewriter";
import { postProvider, pageProvider } from "./plugins/content-provider";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      lib: "/lib",
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      remarkPlugins: [[RemarkUrlRewriter, {}]],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: {
              light: "github-light-default",
              dark: "github-dark-default",
            },
          } satisfies PrettyCodeOptions,
        ],
      ],
    }),
    postProvider(path.resolve(import.meta.dirname, "data/posts")),
    pageProvider(path.resolve(import.meta.dirname, "data/pages")),
  ],
});
