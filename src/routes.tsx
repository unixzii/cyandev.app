import { lazy } from "react";
import { type RouteObject } from "react-router";

import RootLayout from "./pages/layout";
import NotFound from "./pages/not-found";
import ErrorBoundary from "./pages/error";
import { PostNotFoundError } from "./errors";
import posts from "virtual:posts";

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
        async loader({ params }) {
          const { slug } = params;
          if (!slug) {
            throw new Error("Missing slug");
          }
          const postModulePromise = posts[slug];
          if (!postModulePromise) {
            throw new PostNotFoundError();
          }
          const postModule = await postModulePromise;
          return {
            metadata: postModule.metadata,
            MDXContent: postModule.default,
          };
        },
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
