import { useRouteError } from "react-router";

import { NavBar } from "@/components/NavBar";
import { ReadableArea } from "@/components/ReadableArea";

export default function ErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <ReadableArea>
      <NavBar />
      <h1 className="mt-12 font-bold">Oops! We got an error :(</h1>
      <div className="mt-4 font-mono text-sm text-secondary">
        {error.toString()}
      </div>
    </ReadableArea>
  );
}
