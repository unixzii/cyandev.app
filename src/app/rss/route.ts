import { Feed } from "feed";
import { postSlugs, getPostModule } from "@/data/posts";
import { renderPostToString } from "./renderHelper";

export const dynamic = "force-static";

export async function GET() {
  // TODO: add other metadata.
  const feed = new Feed({
    title: "Cyandev",
    description: "Cyandev's personal blog",
    id: "https://cyandev.app",
    link: "https://cyandev.app",
    image: "https://cyandev.app/twitter-cards/common.png",
    favicon: "https://cyandev.app/favicon.ico",
    copyright: "All rights reserved 2025, Cyandev",
    author: {
      name: "Cyandev",
      email: "unixzii@gmail.com",
      link: "https://cyandev.app",
    },
  });

  for (const postSlug of postSlugs) {
    const postModule = getPostModule(postSlug);
    if (!postModule) {
      continue;
    }
    const { title, description, date } = postModule.metadata;
    const content = await renderPostToString(postModule);
    const postUrl = `https://cyandev.app/posts/${postSlug}`;
    feed.addItem({
      title,
      description,
      date,
      content,
      id: postUrl,
      link: postUrl,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
