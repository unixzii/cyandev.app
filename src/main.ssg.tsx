import { type ReactNode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { type RouteObject, createMemoryRouter } from "react-router";

import { App, metadata as appMetadata } from "./App";
import { Reader } from "./components/reader";
import { collectMetadata, renderMetadataToString } from "./metadata";
import routes from "./routes";
import posts from "virtual:posts";

export interface RenderedPage {
  path: string;
  contents: string;
  metadata: string;
}

export interface RenderedRSSItem {
  contents: string;
  metadata: Omit<PostMetadata, "date" | "slug"> & {
    date: Date;
    slug: string;
  };
}

async function renderReactNode(node: ReactNode) {
  const { prelude } = await prerenderToNodeStream(node);
  return await new Promise<string>((resolve, reject) => {
    let data = "";
    prelude.on("data", (chunk) => {
      data += chunk;
    });
    prelude.on("end", () => resolve(data));
    prelude.on("error", reject);
  });
}

async function renderPage(path: string) {
  const router = createMemoryRouter(routes);
  await router.navigate(path);

  const root = <App router={router} />;

  const contents = await renderReactNode(root);
  const metadata = renderMetadataToString(collectMetadata(router, appMetadata));

  return { path, contents, metadata };
}

export async function render() {
  const renderedPages: RenderedPage[] = [];

  async function walkRoutes(routes: RouteObject[], pathSegments: string[]) {
    for (const route of routes) {
      const thisPath = route.path ? route.path : route.index ? "" : undefined;
      if (thisPath === "*") {
        continue;
      }
      if (thisPath !== undefined) {
        pathSegments.push(thisPath);
      }

      if (route.children && route.children.length > 0) {
        await walkRoutes(route.children, pathSegments);
      } else {
        // Only render leaf routes.
        const path = pathSegments.join("/");
        console.log(`Rendering ${path}`);
        renderedPages.push(await renderPage(path));
      }

      pathSegments.pop();
    }
  }

  await walkRoutes(routes, [""]);

  return renderedPages;
}

export async function renderRSS() {
  const renderedItems: RenderedRSSItem[] = [];

  for (const postSlug in posts) {
    const post = await posts[postSlug];

    const { metadata } = post;
    metadata.date = new Date(metadata.date as string);
    metadata.slug = postSlug;

    const contents = await renderReactNode(
      <Reader
        contentComponent={post.default}
        components={{
          img(props) {
            // The title property contains our metadata, it's meaningless for RSS contents.
            const strippedProps = { ...props, title: undefined };
            return <img {...strippedProps} />;
          },
        }}
      />,
    );
    renderedItems.push({
      contents,
      metadata: metadata as RenderedRSSItem["metadata"],
    });
  }

  return renderedItems;
}
