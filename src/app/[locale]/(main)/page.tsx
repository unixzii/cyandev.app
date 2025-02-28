import { Fragment } from "react";
import { getFormatter, getTranslations } from "next-intl/server";
import Link from "@/components/link";
import { buildMetadata } from "@/utils";
import { type PostMetadataWithSlug, listPosts } from "@/data/posts";
import type { PageProps } from "@/types";

function PostItem({
  post,
  formatter,
}: {
  post: PostMetadataWithSlug;
  formatter: Awaited<ReturnType<typeof getFormatter>>;
}) {
  return (
    <li className="flex flex-col gap-1 mb-8">
      <Link
        className="text-xl font-semibold underline decoration-transparent hover:decoration-primary transition-colors duration-200"
        href={`/post/${post.slug}`}
      >
        {post.title}
      </Link>
      <time
        className="text-sm font-light text-secondary"
        dateTime={post.date.toISOString()}
      >
        {formatter.dateTime(+post.date, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
    </li>
  );
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Main" });
  const formatter = await getFormatter({ locale });
  const posts = listPosts();

  return (
    <Fragment>
      <h1 className="page-title">{t("all_posts")}</h1>
      <p className="page-subtitle">{t("n_posts", { count: posts.length })}</p>
      <div className="mt-16">
        <ul>
          {posts.map((post) => (
            <PostItem key={post.slug} post={post} formatter={formatter} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Main" });
  return await buildMetadata(locale, {
    title: t("all_posts"),
  });
}
