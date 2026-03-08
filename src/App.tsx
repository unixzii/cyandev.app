import { Suspense } from "react";
import { RouterProvider } from "react-router/dom";

import { ThemeClientInitializer } from "./theme";
import { MetadataUpdater } from "./metadata";
import { IntlProvider } from "./components/IntlProvider";
import { BASE_URL } from "./config";

export const metadata = {
  title: "Cyandev",
  description: "Cyandev's personal blog",
  url: BASE_URL,
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
