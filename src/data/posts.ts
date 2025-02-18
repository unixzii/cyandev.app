import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { FC } from "react";
import type { MDXComponents } from "mdx/types";

export type PostMetadata = {
  title: string;
  tags: string[];
  description?: string;
  date: Date;
};
export type PostMetadataWithSlug = PostMetadata & {
  slug: string;
};
export type PostModule = {
  MDXContent: FC<{ components: MDXComponents }>;
  metadata: PostMetadata;
};

const postsPath = (() => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(dirname, "../../data/posts");
})();

export async function listPostSlugs(): Promise<string[]> {
  const files = await readdir(postsPath);
  const slugs = new Set<string>();
  for (const file of files) {
    const components = file.split(".");
    slugs.add(components[0]);
  }
  return Array.from(slugs);
}

export async function listPosts(): Promise<PostMetadataWithSlug[]> {
  const posts = [];
  for (const slug of await listPostSlugs()) {
    const { metadata } = await loadPost(slug);
    const metadataWithSlug: PostMetadataWithSlug = {
      ...metadata,
      date: new Date(metadata.date),
      slug,
    };
    posts.push(metadataWithSlug);
  }
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}

export async function loadPost(slug: string): Promise<PostModule> {
  const { default: MDXContent, metadata } = await import(
    `../../data/posts/${slug}.mdx`
  );
  return {
    MDXContent,
    metadata,
  };
}
