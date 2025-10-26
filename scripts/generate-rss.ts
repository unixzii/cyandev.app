import path from "node:path";
import { writeFileSync } from "node:fs";
import { Feed } from "feed";

import type * as ssgModule from "../src/main.ssg";

const BASE_URL = "https://cyandev.app";
const dirname = import.meta.dirname;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import("../dist/server/main.ssg.js" as any).then(
  async (entry: typeof ssgModule) => {
    const { renderRSS } = entry;
    const renderedItems = await renderRSS();

    renderedItems.sort((a, b) => +b.metadata.date - +a.metadata.date);

    const feed = new Feed({
      title: "Cyandev",
      description: "Cyandev's personal blog",
      id: BASE_URL,
      link: BASE_URL,
      feed: `${BASE_URL}/rss.xml`,
      image: `${BASE_URL}/apple-touch-icon.png`,
      favicon: `${BASE_URL}/favicon.ico`,
      copyright: `© ${new Date().getFullYear()} Cyandev`,
      author: {
        name: "Cyandev",
        email: "unixzii@gmail.com",
        link: BASE_URL,
      },
    });

    for (const item of renderedItems) {
      const { contents, metadata } = item;
      feed.addItem({
        title: metadata.title,
        description: metadata.description,
        date: new Date(metadata.date),
        content: contents,
        // Use `/posts` to maintain compatibility with a historical bug.
        id: `${BASE_URL}/posts/${metadata.slug}`,
        link: `${BASE_URL}/post/${metadata.slug}`,
      });
    }

    writeFileSync(path.resolve(dirname, "../dist/rss.xml"), feed.rss2());
  },
);
