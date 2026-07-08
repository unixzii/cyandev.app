import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";

import * as env from "@/env";
import { ReadableArea } from "@/components/ReadableArea";
import { disableAnimation as disableLogoAnimation } from "@/components/Logo";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function RootLayout() {
  const location = useLocation();
  const isRootPage = location.pathname === "/";

  useEffect(() => {
    if (!isRootPage && env.getType() === "client") {
      disableLogoAnimation();
    }
  }, [isRootPage]);

  return (
    <>
      <ReadableArea>
        <NavBar hideHome={isRootPage} />
      </ReadableArea>
      <ReadableArea className="mt-12 mb-20">
        <Outlet />
      </ReadableArea>
      <ReadableArea>
        <Footer />
      </ReadableArea>
      <ScrollRestoration />
    </>
  );
}
