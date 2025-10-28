import posts from "virtual:posts";

type PostModule = (typeof posts)[string] extends Promise<infer T> ? T : never;

const loadingModules: Map<string, Promise<PostModule>> = new Map();
export function loadPost(slug: string): Promise<PostModule> {
  let promise = loadingModules.get(slug);
  if (promise) {
    return promise;
  }

  promise = posts[slug];

  loadingModules.set(slug, promise);
  return promise;
}
