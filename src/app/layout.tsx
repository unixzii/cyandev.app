import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { PropsWithChildren } from "react";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Noto_Serif, Noto_Serif_SC, Geist_Mono } from "next/font/google";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { buildMetadata } from "@/utils";
import { NavBar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GrainTextureBackground } from "@/components/background-textures";
import { LoadingBarContainer } from "@/components/loading-bar";

const sansFont = Inter({ subsets: ["latin"] });
const serifFallbackFont = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--cyan-serif-fallback-font",
});
const serifFont = Noto_Serif({
  subsets: ["latin"],
  variable: "--cyan-serif-font",
  fallback: ["var(--cyan-serif-fallback-font)"],
});
const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--cyan-mono-font",
});

const fontClassNames = [
  sansFont.className,
  serifFallbackFont.variable,
  serifFont.variable,
  monoFont.variable,
].join(" ");

// Workaround: don't inject Font Awesome CSS at run-time,
// which may cause layout shifts.
faConfig.autoAddCss = false;

export const viewport: Viewport = {
  themeColor: [
    { color: "#ffffff", media: "(prefers-color-scheme: light)" },
    { color: "#232323", media: "(prefers-color-scheme: dark)" },
  ],
  viewportFit: "cover",
};

export const metadata = buildMetadata({});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={fontClassNames}>
        <div className="relative min-h-screen">
          <LoadingBarContainer>
            <GrainTextureBackground />
            <NavBar />
            <div>{children}</div>
            <Footer />
          </LoadingBarContainer>
        </div>
      </body>
      <Analytics />
    </html>
  );
}
