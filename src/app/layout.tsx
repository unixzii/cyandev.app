import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { PropsWithChildren } from "react";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Geist_Mono } from "next/font/google";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { buildMetadata } from "@/utils";
import { NavBar } from "@/components/nav";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const geistFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist",
});

const fontClassNames = [interFont.variable, geistFont.variable].join(" ");

// Workaround: don't inject Font Awesome CSS at run-time,
// which may cause layout shifts.
faConfig.autoAddCss = false;

export const viewport: Viewport = {
  themeColor: [
    { color: "#fafafa", media: "(prefers-color-scheme: light)" },
    { color: "#171717", media: "(prefers-color-scheme: dark)" },
  ],
  viewportFit: "cover",
};

export const metadata = buildMetadata({});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html className="theme-system" lang="en">
      <body className={fontClassNames}>
        <div id="appMain" className="relative flow-root">
          <NavBar />
          {children}
        </div>
      </body>
      <Analytics />
    </html>
  );
}
