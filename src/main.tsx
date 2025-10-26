import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";

import { App } from "./App";
import routes from "./routes";

const rootElement = document.getElementById("root")!;
const router = createBrowserRouter(routes);
hydrateRoot(
  rootElement,
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);
