import { Outlet, ScrollRestoration, useLocation } from "react-router";

import { ReadableArea } from "@/components/ReadableArea";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { WinterBoard } from "lib/winter-board";

export default function RootLayout() {
  const location = useLocation();
  const isRootPage = location.pathname === "/";

  return (
    <>
      <WinterBoard
        className="fixed left-0 top-0 -z-50 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgb(120 120 132 / 21%), transparent)",
        }}
      />
      <ReadableArea>
        <NavBar hideHome={isRootPage} />
      </ReadableArea>
      <ReadableArea className="mt-12 mb-20 winter-board-enabled">
        <Outlet />
      </ReadableArea>
      <ReadableArea className="winter-board-enabled">
        <Footer />
      </ReadableArea>
      <ScrollRestoration />
    </>
  );
}
