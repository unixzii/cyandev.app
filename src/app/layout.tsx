import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { PropsWithChildren } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { buildMetadata } from "@/utils";
import { NavBar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GrainTextureBackground } from "@/components/background-textures";

const inter = Inter({ subsets: ["latin"] });

// Workaround: don't inject Font Awesome CSS at run-time,
// which may cause layout shifts.
faConfig.autoAddCss = false;

export const metadata = buildMetadata({});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen">
          <GrainTextureBackground />
          <NavBar />
          <div className={inter.className}>{children}</div>
          <Footer />
        </div>
      </body>
      <Analytics />
    </html>
  );
}
