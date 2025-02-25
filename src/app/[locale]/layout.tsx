import { PropsWithChildren } from "react";
import type { Viewport } from "next";
import { redirect } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeClientInitializer, ThemeEarlyInitializer } from "@/theme";
import { supportedLocales } from "@/i18n";
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

export const dynamic = "force-static";
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

export default async function RootLayout({
  params,
  children,
}: PropsWithChildren & { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale)) {
    redirect("/404");
  }

  return (
    <html lang={locale} data-theme="system" suppressHydrationWarning={true}>
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

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}
