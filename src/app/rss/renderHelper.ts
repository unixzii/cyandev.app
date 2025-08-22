import { jsx } from "react/jsx-runtime";
import type { ComponentProps } from "react";
import type { RefinedPostModule } from "@/data/posts";

export async function renderPostToString(module: RefinedPostModule) {
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
