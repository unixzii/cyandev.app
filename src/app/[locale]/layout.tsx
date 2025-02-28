import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { RootLayout } from "@/components/root-layout";
import { buildMetadata } from "@/utils";
import type { PageProps } from "@/types";

export const dynamic = "force-static";
export const dynamicParams = false;

export default async function Layout({
  params,
  children,
}: PropsWithChildren & PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return <RootLayout locale={locale}>{children}</RootLayout>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return await buildMetadata(locale);
}
