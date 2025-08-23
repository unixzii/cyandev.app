import { Feed } from "feed";
import { postSlugs, getPostModule } from "@/data/posts";
import { renderPostToString } from "./renderHelper";

export const dynamic = "force-static";

const BASE_URL = "https://cyandev.app";

export async function GET() {
  // TODO: add other metadata.
  const feed = new Feed({
    title: "Cyandev",
    description: "Cyandev's personal blog",
    id: BASE_URL,
    link: BASE_URL,
    image: `${BASE_URL}/twitter-cards/common.png`,
    favicon: `${BASE_URL}/favicon.ico`,
    copyright: "All rights reserved 2025, Cyandev",
    author: {
      name: "Cyandev",
      email: "unixzii@gmail.com",
      link: BASE_URL,
    },
  });

  for (const postSlug of postSlugs) {
    const postModule = getPostModule(postSlug);
    if (!postModule) {
      continue;
    }
    const { title, description, date } = postModule.metadata;
    const content = await renderPostToString(postModule);
    feed.addItem({
      title,
      description,
      date,
      content,
      // Use `/posts` to maintain compatibility with a historical bug.
      id: `${BASE_URL}/posts/${postSlug}`,
      link: `${BASE_URL}/post/${postSlug}`,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
