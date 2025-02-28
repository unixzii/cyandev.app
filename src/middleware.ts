import type { NextRequest } from "next/server";
import createNextIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const nextIntlMiddleware = createNextIntlMiddleware(routing);
export default async function middleware(request: NextRequest) {
  return nextIntlMiddleware(request);
}

export const config = {
  // Note: we cannot use dynamic expressions here.
  matcher: ["/", "/(en|zh-cn)/:path*", "/((?!_next|_vercel|rss|og|.*\\..*).*)"],
};
