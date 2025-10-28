import posts from "virtual:posts";
import pages from "virtual:pages";

type PostModule = (typeof posts)[string] extends Promise<infer T> ? T : never;
type PageModule = (typeof pages)[string] extends Promise<infer T> ? T : never;

const loadingModules: Map<string, Promise<unknown>> = new Map();

function loadModule<T>(key: string, loader: () => Promise<T>): Promise<T> {
  let promise = loadingModules.get(key) as Promise<T>;
  if (promise) {
    return promise;
  }

  promise = loader();

  loadingModules.set(key, promise);
  return promise;
}

export function loadPost(slug: string): Promise<PostModule> {
  return loadModule(`post-${slug}`, () => posts[slug]);
}

export function loadPage(slug: string): Promise<PageModule> {
  return loadModule(`page-${slug}`, () => pages[slug]);
}
