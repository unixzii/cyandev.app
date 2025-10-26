/// <reference types="react" />

interface PostMetadata {
  title: string;
  tags: string[];
  description?: string;
  date: string | Date;
  slug?: string;
}

declare module "virtual:posts" {
  const posts: Record<
    string,
    Promise<{
      metadata: PostMetadata;
      default: React.FunctionComponent;
    }>
  >;
  export default posts;
}

declare module "virtual:postIndex" {
  const postIndex: PostMetadata[];
  export default postIndex;
}
