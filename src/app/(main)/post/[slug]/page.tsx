import { Fragment } from "react";

import { listPostSlugs } from "@/data/posts";
import "./styles.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;
  const { default: MDXContent, metadata } = await import(
    `@/../data/posts/${slug}.mdx`
  );
  const { title, description } = metadata;

  return (
    <Fragment>
      <h1 className="page-title">{title}</h1>
      {description && <p className="mt-8 text-xl">{description}</p>}
      <article className="mt-12 md-reader">
        <MDXContent />
      </article>
    </Fragment>
  );
}

export async function generateStaticParams() {
  return (await listPostSlugs()).map((slug) => ({ slug }));
}

export const dynamicParams = false;
