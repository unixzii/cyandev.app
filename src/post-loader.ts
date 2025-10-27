import posts from "virtual:posts";

type PostModule = (typeof posts)[string] extends Promise<infer T> ? T : never;
const loadingModules: Map<string, Promise<PostModule>> = new Map();

export class PostNotFoundError extends Error {
  constructor(slug: string) {
    super(`Post not found: ${slug}`);
  }
}

export function loadPost(slug: string): Promise<PostModule> {
  let promise = loadingModules.get(slug);
  if (promise) {
    return promise;
  }

  promise = posts[slug];
  if (!promise) {
    throw new PostNotFoundError(slug);
  }

  loadingModules.set(slug, promise);
  return promise;
}
