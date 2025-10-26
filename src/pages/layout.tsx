import { Outlet } from "react-router";

import { ReadableArea } from "@/components/ReadableArea";
import { Footer } from "@/components/Footer";

export default function RootLayout() {
  return (
    <div>
      <ReadableArea className="mt-30 mb-12">
        <Outlet />
      </ReadableArea>
      <Footer />
    </div>
  );
}
