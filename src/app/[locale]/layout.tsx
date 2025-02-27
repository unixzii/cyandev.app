import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { RootLayout } from "@/components/root-layout";

export const dynamic = "force-static";

export default async function Layout({
  params,
  children,
}: PropsWithChildren & { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return <RootLayout locale={locale}>{children}</RootLayout>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
