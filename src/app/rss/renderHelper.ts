import { jsx } from "react/jsx-runtime";
import type { PostModule } from "post-catalog-loader!";

export async function renderPostToString(module: PostModule) {
  const ReactDOMServer = await import("react-dom/server");
  return ReactDOMServer.renderToString(jsx(module.MDXContent, {}));
}
