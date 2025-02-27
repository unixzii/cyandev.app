import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Note: we cannot use dynamic expressions here.
  matcher: ["/", "/(en|zh-cn)/:path*", "/((?!_next|_vercel|rss|.*\\..*).*)"],
};
