import { Metadata as NextMetadata } from "next";

type Metadata = {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
};

export default function buildMetadata(metadata: Metadata): NextMetadata {
  const { title: routeTitle, description, ogImage, ogUrl } = metadata;

  const title = routeTitle ? `${routeTitle} | Cyandev` : "Cyandev";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage,
      url: ogUrl,
    },
    twitter: {
      title,
      description,
      images: ogImage,
      site: "@unixzii",
      card: ogImage ? "summary_large_image" : "summary",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      viewportFit: "cover",
    },
    themeColor: "#78B3CE",
    other: {
      "msapplication-TileColor": "#78B3CE",
    },
  };
}
