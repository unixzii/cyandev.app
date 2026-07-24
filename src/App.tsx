import { Suspense } from "react";
import { RouterProvider } from "react-router/dom";

import { ThemeClientInitializer } from "./theme";
import { type Metadata, MetadataUpdater } from "./metadata";
import { IntlProvider } from "./components/IntlProvider";
import { BASE_URL } from "./config";

export const metadata: Metadata = {
  title: "Cyandev",
  description: "Cyandev's personal blog",
  url: BASE_URL,
  imageUrl: "https://cy4n.dev/twitter-cards/common.png",
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
        <IntlProvider>
          <RouterProvider router={router} />
        </IntlProvider>
      </Suspense>
    </>
  );
}
