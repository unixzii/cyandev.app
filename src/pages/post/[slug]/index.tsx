import { useLoaderData } from "react-router";

import { Reader } from "@/components/reader";

export default function PostPage() {
  const { metadata, MDXContent } = useLoaderData();
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
