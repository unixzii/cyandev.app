import { Outlet } from "react-router";

import { ReadableArea } from "@/components/ReadableArea";
import { Footer } from "@/components/Footer";

export default function RootLayout() {
  return (
    <>
      <ReadableArea className="mb-12">
        <Outlet />
      </ReadableArea>
      <Footer />
    </>
  );
}
