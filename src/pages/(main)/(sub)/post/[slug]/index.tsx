import { Reader } from "@/components/reader";
import type posts from "virtual:posts";

type PostModule = (typeof posts)[string] extends Promise<infer T> ? T : never;

export default function PostPage(props: { postModule: PostModule }) {
  const { postModule } = props;

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
