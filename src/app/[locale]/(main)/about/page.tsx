import { Fragment } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PageProps } from "@/types";
import { buildMetadata } from "@/utils";

async function loadPageModule(locale: string) {
  if (locale === "en") {
    return await import("../../../../../data/pages/about.en.mdx");
  }
  return await import("../../../../../data/pages/about.mdx");
}

export default async function Page(props: PageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "About" });

  const { default: MDXContent } = await loadPageModule(locale);

  return (
    <Fragment>
      <h1 className="page-title">{t("title")}</h1>
      <article className="mt-16 md-reader">
        <MDXContent />
      </article>
    </Fragment>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "About" });

  return buildMetadata(locale, {
    title: t("title"),
  });
}

export const dynamic = "force-static";
