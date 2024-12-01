import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  const url = new URL(request.url);
  const { slug } = await params;
  url.pathname = `/blog/${slug}/en`;
  url.search = ""; // Remove the extra search params.
  return NextResponse.redirect(url);
}
