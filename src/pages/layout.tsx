import { Outlet, ScrollRestoration, useLocation } from "react-router";

import { ReadableArea } from "@/components/ReadableArea";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function RootLayout() {
  const location = useLocation();
  const isRootPage = location.pathname === "/";

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
