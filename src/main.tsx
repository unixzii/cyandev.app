import { StrictMode, Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import routes from "./routes";
import { ThemeClientInitializer } from "@/theme";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <ThemeClientInitializer />
      <Suspense>
        <RouterProvider router={router} />
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
