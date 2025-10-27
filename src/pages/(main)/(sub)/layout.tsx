import { Outlet } from "react-router";

import { NavBar } from "@/components/NavBar";

export default function SubLayout() {
  return (
    <>
      <NavBar />
      <div className="mt-12">
        <Outlet />
      </div>
    </>
  );
}
