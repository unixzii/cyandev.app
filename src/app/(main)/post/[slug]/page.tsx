import { Children as ReactChildren, Fragment } from "react";
import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";

import { postSlugs, getPostModule } from "@/data/posts";
import { formatTimestampToHumanReadableDate } from "@/utils/date-fns";
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
  params: Promise<{ slug: string }>;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;
  const { MDXContent, metadata } = getPostModule(slug);
  const { title, date } = metadata;

  return (
    <Fragment>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">
        <time dateTime={date.toISOString()}>
          {formatTimestampToHumanReadableDate(+date, "long")}
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
  const { metadata } = getPostModule(slug);
  const { title, description } = metadata;
  return buildMetadata({
    title,
    description,
    ogUrl: `/post/${slug}`,
  });
}

export const dynamicParams = false;
