import { Fragment } from "react";
import Link from "next/link";
import { buildMetadata } from "@/utils";
import { formatTimestampToHumanReadableDate } from "@/utils/date-fns";
import { type PostMetadataWithSlug, listPosts } from "@/data/posts";

export const metadata = buildMetadata({
  description: "👋 Hi, I'm Cyandev. This is my personal website, welcome.",
  ogUrl: "https://cyandev.app",
  ogImage: "https://cyandev.app/twitter-cards/common.png",
});

function PostItem({ post }: { post: PostMetadataWithSlug }) {
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
        {formatTimestampToHumanReadableDate(+post.date)}
      </time>
    </li>
  );
}

export default async function Page() {
  const posts = await listPosts();

  return (
    <Fragment>
      <h1 className="page-title">All Posts</h1>
      <p className="mt-2 font-light text-secondary">{posts.length} posts</p>
      <div className="mt-12">
        <ul>
          {posts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
