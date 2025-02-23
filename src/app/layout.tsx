import { PropsWithChildren } from "react";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeClientInitializer, ThemeEarlyInitializer } from "@/theme";
import { buildMetadata } from "@/utils";
import { NavBar } from "./_components/navbar";

import "@/styles/globals.css";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const geistFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist",
});

const fontClassNames = [interFont.variable, geistFont.variable].join(" ");

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
export const metadata = buildMetadata();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" data-theme="system" suppressHydrationWarning={true}>
      <head>
        <ThemeEarlyInitializer />
      </head>
      <body className={fontClassNames}>
        <div id="appMain" className="relative flow-root">
          <NavBar />
          {children}
        </div>
      </body>
      <ThemeClientInitializer />
      <Analytics />
    </html>
  );
}
