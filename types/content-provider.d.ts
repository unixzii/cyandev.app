/// <reference types="react" />
/// <reference types="mdx/types" />

interface PostMetadata {
  title: string;
  tags?: string[];
  description?: string;
  date?: string | Date;
  slug?: string;
}

type MDXContent = React.FunctionComponent<{ components: MDXComponents }>;

interface PostModule {
  metadata: PostMetadata;
  default: MDXContent;
}

declare module "virtual:posts" {
  const posts: Record<string, Promise<PostModule>>;
  export default posts;
}

declare module "virtual:postIndex" {
  const postIndex: PostMetadata[];
  export default postIndex;
}

declare module "virtual:pages" {
  const pages: Record<string, Promise<PostModule>>;
  export default pages;
}
