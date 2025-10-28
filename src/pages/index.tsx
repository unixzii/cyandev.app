import { Link } from "react-router";

import { Logo } from "@/components/Logo";
import postIndex from "virtual:postIndex";

function PostItem({
  post,
  formatter,
}: {
  post: PostMetadata;
  formatter: Intl.DateTimeFormat;
}) {
  const date = new Date(post.date!);

  return (
    <li className="flex flex-col gap-1 mb-8">
      <Link
        className="text-xl font-semibold underline decoration-transparent hover:decoration-primary transition-colors duration-200"
        to={`/post/${post.slug}`}
      >
        {post.title}
      </Link>
      <time className="text-sm text-secondary" dateTime={date.toISOString()}>
        {formatter.format(date)}
      </time>
    </li>
  );
}

export default function RootPage() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  });

  return (
    <main>
      <h1 className="page-title font-mono">
        <Logo />
      </h1>
      <p className="page-subtitle">
        A random guy on the internet, a software engineer. See{" "}
        <Link
          className="text-primary font-medium underline decoration-transparent hover:decoration-primary transition-colors duration-200"
          to="/page/about"
        >
          here
        </Link>{" "}
        to learn about me.
      </p>
      <div className="mt-16">
        <ul>
          {postIndex.map((post) => (
            <PostItem key={post.slug} post={post} formatter={formatter} />
          ))}
        </ul>
      </div>
    </main>
  );
}
