import { use } from "react";
import { useParams } from "react-router";

import { Reader } from "@/components/reader";
import { loadPost } from "@/post-loader";

export default function PostPage() {
  const { slug } = useParams() as { slug: string };
  const postModule = use(loadPost(slug));

  const { metadata, default: MDXContent } = postModule;
  const { title, date } = metadata;
  const parsedDate = new Date(date);

  return (
    <main>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">
        <time dateTime={parsedDate.toISOString()}>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(parsedDate)}
        </time>
      </p>
      <article className="mt-16 md-reader">
        <Reader contentComponent={MDXContent} />
      </article>
    </main>
  );
}
