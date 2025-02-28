import { type PropsWithChildren, Fragment } from "react";
import type { Viewport } from "next/types";

import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: [
    { color: "#fafafa", media: "(prefers-color-scheme: light)" },
    { color: "#171717", media: "(prefers-color-scheme: dark)" },
  ],
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}
