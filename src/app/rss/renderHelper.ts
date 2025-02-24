import { jsx } from "react/jsx-runtime";
import { loadPost } from "@/data/posts";

type PromiseValue<P> = P extends Promise<infer T> ? T : P;

export async function renderPostToString(
  module: PromiseValue<ReturnType<typeof loadPost>>,
) {
  const ReactDOMServer = await import("react-dom/server");
  return ReactDOMServer.renderToString(jsx(module.MDXContent, {}));
}
