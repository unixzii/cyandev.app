import { StrictMode, Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import routes from "./routes";
import { MetadataContext } from "./metadata";
import { ThemeClientInitializer } from "@/theme";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <ThemeClientInitializer />
      <Suspense>
        <MetadataContext
          router={router}
          initialMetadata={{
            title: "Cyandev",
            description: "Cyandev's personal blog",
            url: `https://cyandev.app`,
          }}
        >
          <RouterProvider router={router} />
        </MetadataContext>
      </Suspense>
    </>
  );
}

const rootElement = document.getElementById("root")!;
hydrateRoot(
  rootElement,
  <StrictMode>
    <App />
  </StrictMode>,
);
