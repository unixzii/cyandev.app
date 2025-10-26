import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import routes from "./routes";
import { ThemeClientInitializer } from "@/theme";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <StrictMode>
      <ThemeClientInitializer />
      <RouterProvider router={router} />
    </StrictMode>
  );
}

const rootElement = document.getElementById("root")!;
hydrateRoot(rootElement, <App />);
