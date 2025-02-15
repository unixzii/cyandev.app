import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type PostMetadata = {
  title: string;
  tags: string[];
  description?: string;
  date: string;
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
