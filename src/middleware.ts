import { NextRequest, NextResponse, MiddlewareConfig } from "next/server";
import { supportedLocales } from "./i18n";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function inferLocale(request: NextRequest): string {
  return "en-us";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  const defaultLocale = inferLocale(request);
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config: MiddlewareConfig = {
  matcher: ["/", "/404", "/post/:slug*"],
};
