import { lazy, use } from "react";
import { type RouteObject } from "react-router";

import RootLayout from "./pages/(main)/layout";
import SubLayout from "./pages/(main)/(sub)/layout";
import NotFound from "./pages/not-found";
import ErrorBoundary from "./pages/error";
import { loadPost } from "./post-loader";
import postIndex from "virtual:postIndex";

const RootPage = lazy(() => import("./pages/(main)"));
const PostPage = lazy(() => import("./pages/(main)/(sub)/post/[slug]"));

function wrapPostPage(slug: string) {
  function WrappedPostPage() {
    const postModule = use(loadPost(slug));
    return <PostPage slug={slug} postModule={postModule} />;
  }
  return WrappedPostPage;
}

const routes: RouteObject[] = [
  {
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: RootPage,
      },
      {
        Component: SubLayout,
        children: postIndex.map((post) => ({
          path: `post/${post.slug}`,
          Component: wrapPostPage(post.slug!),
        })),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
];
export default routes;
