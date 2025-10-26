import { Suspense } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { createMemoryRouter, RouterProvider } from "react-router";

import routes from "./routes";

function App({ router }: { router: ReturnType<typeof createMemoryRouter> }) {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export async function render(path: string) {
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
  return contents;
}
