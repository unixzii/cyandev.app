import { useRouteError } from "react-router";

import NotFound from "./not-found";
import { PostNotFoundError } from "@/post-loader";

export default function ErrorBoundary() {
  const error = useRouteError() as Error;
  if (error instanceof PostNotFoundError) {
    return <NotFound />;
  }
  return <div>{error.toString()}</div>;
}
