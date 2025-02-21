import { Metadata } from "next";

type PartialMetadata = {
  title: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
};

const TITLE = "Cyandev";
const DESCRIPTION = "Cyandev's personal blog";
const OG_IMAGE = "/twitter-cards/common.png";
const OG_URL_BASE = "https://cyandev.app";

function buildOpenGraph(
  partial?: PartialMetadata,
): Pick<Metadata, "openGraph" | "twitter"> {
  const title = partial?.title ? `${partial.title} | ${TITLE}` : TITLE;
  const description = partial?.description ?? DESCRIPTION;
  const images = OG_URL_BASE + (partial?.ogImage ?? OG_IMAGE);

  return {
    openGraph: {
      title,
      description,
      images,
      url: OG_URL_BASE + (partial?.ogUrl ?? "/"),
    },
    twitter: {
      title,
      description,
      images,
      site: "@unixzii",
      card: "summary_large_image",
    },
  };
}

export default function buildMetadata(partial?: PartialMetadata): Metadata {
  if (partial) {
    return {
      title: partial.title,
      description: partial.description,
      ...buildOpenGraph(partial),
    };
  }

  return {
    title: {
      template: `%s | ${TITLE}`,
      default: TITLE,
    },
    description: DESCRIPTION,
    icons: {
      icon: "/icon.png",
      apple: "/apple-touch-icon.png",
    },
    ...buildOpenGraph({ title: TITLE }),
  };
}
