import { prerenderToNodeStream } from "react-dom/static";
import { type RouteObject, createMemoryRouter } from "react-router";

import { App, metadata as appMetadata } from "./App";
import { collectMetadata, renderMetadataToString } from "./metadata";
import routes from "./routes";

export interface RenderedPage {
  path: string;
  contents: string;
  metadata: string;
}

async function renderPage(path: string) {
  const router = createMemoryRouter(routes);
  await router.navigate(path);

  const root = <App router={router} />;

  const { prelude } = await prerenderToNodeStream(root);
  const contents = await new Promise<string>((resolve, reject) => {
    let data = "";
    prelude.on("data", (chunk) => {
      data += chunk;
    });
    prelude.on("end", () => resolve(data));
    prelude.on("error", reject);
  });

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
