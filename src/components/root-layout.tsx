import { PropsWithChildren } from "react";
import { Inter, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { ThemeClientInitializer, ThemeEarlyInitializer } from "@/theme";
import { NavBar } from "@/components/navbar";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const geistFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist",
});

const fontClassNames = [interFont.variable, geistFont.variable].join(" ");

export async function RootLayout({
  locale,
  children,
}: PropsWithChildren & { locale: string }) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} data-theme="system" suppressHydrationWarning={true}>
      {/* eslint-disable-next-line @next/next/no-head-element*/}
      <head>
        <ThemeEarlyInitializer />
      </head>
      <body className={fontClassNames}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div id="appMain" className="relative flow-root">
            <NavBar />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
      <ThemeClientInitializer />
      <Analytics />
    </html>
  );
}
