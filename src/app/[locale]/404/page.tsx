import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default function NotFound() {
  // Why are we doing this?
  //
  // First, Next.js will use the root `not-found.js` to handle all
  // unmatched routes, which is not wrapped by our locale layout.
  // So we have to use `rewrites` in `next.config.js` to rewrite
  // the fallback route to this page (as a trampoline).
  //
  // The reason we cannot render the 404 contents here directly is
  // because rewrote responses have an unwanted 200 status code. So
  // we need to call `notFound()` again to throw a not found error,
  // which will be handled by `not-found.js` in locale layout.
  //
  // And now you know Next.js sucks.
  notFound();
}
