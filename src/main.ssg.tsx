import { Suspense } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { createMemoryRouter, RouterProvider } from "react-router";

import routes from "./routes";
import postIndex from "virtual:postIndex";

function App({ router }: { router: ReturnType<typeof createMemoryRouter> }) {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export interface RenderedPage {
  path: string;
  contents: string;
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
  return { path, contents };
}

export async function render() {
  const renderedPages: RenderedPage[] = [];

  renderedPages.push(await renderPage("/"));
  for (const post of postIndex) {
    renderedPages.push(await renderPage(`/post/${post.slug}`));
  }

  return renderedPages;
}
