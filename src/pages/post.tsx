import { Reader } from "@/components/reader";
import { CommentComposer } from "@/components/comment/CommentComposer";

export default function PostPage(props: { postModule: PostModule }) {
  const { postModule } = props;
  const { metadata, default: contentComponent } = postModule;
  const { title, date } = metadata;
  const parsedDate = date ? new Date(date) : undefined;

  return (
    <>
      <main>
        <h1 className="page-title">{title}</h1>
        {parsedDate ? (
          <p className="page-subtitle">
            <time dateTime={parsedDate.toISOString()}>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(parsedDate)}
            </time>
          </p>
        ) : null}
        <article className="mt-16 md-reader">
          <Reader contentComponent={contentComponent} />
        </article>
      </main>

      <div className="mt-12">
        <h1 className="mb-4 text-xl font-semibold">Comments</h1>
        <CommentComposer />
      </div>
    </>
  );
}
