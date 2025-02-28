import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type PartialMetadata = {
  title: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
};

type Messages = {
  title: string;
  description: string;
};

const URL_BASE = "https://cyandev.app";
const OG_IMAGE = "/twitter-cards/common.png";

function buildOpenGraph(
  messages: Messages,
  partial?: PartialMetadata,
): Partial<Metadata> {
  const title = partial?.title
    ? `${partial.title} | ${messages.title}`
    : messages.title;
  const description = partial?.description ?? messages.description;
  const images = URL_BASE + (partial?.ogImage ?? OG_IMAGE);

  return {
    openGraph: {
      title,
      description,
      images,
      url: URL_BASE + (partial?.ogUrl ?? "/"),
    },
    twitter: {
      title,
      description,
      images,
      site: "@unixzii",
      card: "summary_large_image",
    },
    alternates: {
      canonical: URL_BASE,
      languages: {
        "en-US": URL_BASE + "/en",
        "zh-CN": URL_BASE + "/zh-cn",
      },
      types: {
        "application/rss+xml": URL_BASE + "/rss",
      },
    },
  };
}

export default async function buildMetadata(
  locale: string,
  partial?: PartialMetadata,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const messages: Messages = {
    title: t("title"),
    description: t("description"),
  };

  if (partial) {
    return {
      title: partial.title,
      description: partial.description,
      ...buildOpenGraph(messages, partial),
    };
  }

  return {
    title: {
      template: `%s | ${messages.title}`,
      default: messages.title,
    },
    description: messages.description,
    icons: {
      icon: "/icon.png",
      apple: "/apple-touch-icon.png",
    },
    ...buildOpenGraph(messages),
  };
}
