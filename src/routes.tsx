import { lazy } from "react";
import { type RouteObject } from "react-router";

import RootLayout from "./pages/layout";
import NotFound from "./pages/not-found";
import ErrorBoundary from "./pages/error";

const RootPage = lazy(() => import("./pages"));
const PostPage = lazy(() => import("./pages/post/[slug]"));

const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: RootPage,
      },
      {
        path: "post/:slug",
        Component: PostPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
];
export default routes;
