import { jsx } from "react/jsx-runtime";
import type { ComponentProps } from "react";
import type { PostModule } from "post-catalog-loader!";

export async function renderPostToString(module: PostModule) {
  const ReactDOMServer = await import("react-dom/server");
  return ReactDOMServer.renderToString(
    jsx(module.MDXContent, {
      components: {
        img(props) {
          // The title property contains our metadata, it's meaningless for RSS contents.
          const strippedProps = { ...props, title: undefined };
          return jsx("img", strippedProps);
        },
      },
    } as ComponentProps<typeof module.MDXContent>),
  );
}
