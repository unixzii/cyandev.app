import { Children as ReactChildren, Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter } from "next-intl/server";
import type { MDXComponents } from "mdx/types";

import { postSlugs, getPostModule } from "@/data/posts";
import { buildMetadata } from "@/utils";
import { CodeBlock } from "./_components/CodeBlock";
import "./styles.css";

const overrideComponents: MDXComponents = {
  pre(props) {
    if (ReactChildren.count(props.children) === 1) {
      const child = ReactChildren.toArray(props.children)[0];
      if (
        typeof child === "object" &&
        "type" in child &&
        child.type === "code"
      ) {
        return (
          <CodeBlock
            originalClassName={child.props.className}
            code={child.props.children}
          />
        );
      }
    }
    return <pre {...props} />;
  },
};

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function Page(props: PageProps) {
  const { slug, locale } = await props.params;
  const postModule = getPostModule(slug);
  if (!postModule) {
    notFound();
  }
  const { MDXContent, metadata } = postModule;
  const { title, date } = metadata;

  const formatter = await getFormatter({ locale });

  return (
    <Fragment>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">
        <time dateTime={date.toISOString()}>
          {formatter.dateTime(+date, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </p>
      <article className="mt-16 md-reader">
        <MDXContent components={overrideComponents} />
      </article>
    </Fragment>
  );
}

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const postModule = getPostModule(slug);
  if (!postModule) {
    notFound();
  }
  const { metadata } = postModule;
  const { title, description } = metadata;
  return buildMetadata({
    title,
    description,
    ogUrl: `/post/${slug}`,
  });
}

export const dynamic = "force-static";
export const dynamicParams = false;
