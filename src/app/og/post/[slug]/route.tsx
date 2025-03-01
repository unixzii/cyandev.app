import path from "node:path";
import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { postSlugs, getPostModule } from "@/data/posts";

export const dynamic = "force-static";

async function loadAsset(filename: string) {
  const assetPath = path.join(process.cwd(), "assets", filename);
  return await readFile(assetPath);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const postModule = getPostModule(slug)?.metadata;
  if (!postModule) {
    return NextResponse.json({ err: "post not found" }, { status: 404 });
  }
  const { title, ogAttributes } = postModule;

  const backgroundData = await loadAsset("images/og-background.png");
  const interFontData = await loadAsset("fonts/Inter-Bold.ttf");
  const fallbackFontData = await loadAsset("fonts/NotoSansSC-Bold.ttf");
  const geistMonoFontData = await loadAsset("fonts/GeistMono-Bold.ttf");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: 600,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          style={{ width: "100%", height: "100%" }}
          src={`data:image/png;base64,${backgroundData.toString("base64")}`}
        />
        <div
          style={{
            position: "absolute",
            top: "260px",
            left: 0,
            width: "100%",
            paddingLeft: "70px",
            paddingRight: `${60 + (ogAttributes?.paddingRight ?? 0)}px`,
            fontFamily: "Inter",
            fontSize: 100,
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: 0,
            paddingLeft: "70px",
            fontFamily: "Geist Mono",
            fontSize: 40,
          }}
        >
          {"cyandev_"}
        </div>
      </div>
    ),
    {
      width: 1350,
      height: 675,
      fonts: [
        {
          name: "Inter",
          data: interFontData,
          style: "normal",
        },
        {
          name: "NotoSansSC",
          data: fallbackFontData,
          style: "normal",
        },
        {
          name: "GeistMono",
          data: geistMonoFontData,
          style: "normal",
        },
      ],
    },
  );
}

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}
