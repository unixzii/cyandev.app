import { lazy, use } from "react";
import { type RouteObject } from "react-router";

import RootLayout from "./pages/layout";
import NotFound from "./pages/not-found";
import ErrorBoundary from "./pages/error";
import { loadPost, loadPage } from "./content-loader";
import postIndex from "virtual:postIndex";
import pages from "virtual:pages";

const RootPage = lazy(() => import("./pages/index"));
const PostPage = lazy(() => import("./pages/post"));

function wrapPostPage(
  slug: string,
  loader: (slug: string) => Promise<PostModule>,
) {
  function WrappedPostPage() {
    const postModule = use(loader(slug));
    return <PostPage postModule={postModule} />;
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
      ...postIndex.map((post) => ({
        path: `post/${post.slug}`,
        Component: wrapPostPage(post.slug!, loadPost),
        metadata: {
          title: post.title,
          description: post.description,
          url: `https://cyandev.app/post/${post.slug}`,
        },
      })),
      ...Object.keys(pages).map((pageSlug) => ({
        path: `page/${pageSlug}`,
        Component: wrapPostPage(pageSlug, loadPage),
      })),
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
];
export default routes;
