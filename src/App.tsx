import { Suspense } from "react";
import { RouterProvider } from "react-router/dom";

import { ThemeClientInitializer } from "./theme";
import { MetadataUpdater } from "./metadata";

export const metadata = {
  title: "Cyandev",
  description: "Cyandev's personal blog",
  url: `https://cyandev.app`,
};

export function App(props: {
  router: Parameters<typeof RouterProvider>[0]["router"];
}) {
  const { router } = props;
  return (
    <>
      <ThemeClientInitializer />
      <MetadataUpdater router={router} initialMetadata={metadata} />
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}
