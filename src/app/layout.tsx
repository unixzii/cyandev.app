import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { PropsWithChildren } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Noto_Serif, Geist_Mono } from "next/font/google";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { buildMetadata } from "@/utils";
import { NavBar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GrainTextureBackground } from "@/components/background-textures";

const sansFont = Inter({ subsets: ["latin"] });
const serifFont = Noto_Serif({
  subsets: ["latin"],
  variable: "--cyan-serif-font",
});
const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--cyan-mono-font",
});

// Workaround: don't inject Font Awesome CSS at run-time,
// which may cause layout shifts.
faConfig.autoAddCss = false;

export const metadata = buildMetadata({});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#78b3ce"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#80b8c6"
        />
      </head>
      <body
        className={`${sansFont.className} ${serifFont.variable} ${monoFont.variable}`}
      >
        <div className="relative min-h-screen">
          <GrainTextureBackground />
          <NavBar />
          <div>{children}</div>
          <Footer />
        </div>
      </body>
      <Analytics />
    </html>
  );
}
