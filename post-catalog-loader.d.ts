declare module "post-catalog-loader!" {
  import { FC } from "react";
  import { MDXComponents } from "mdx/types";

  export type PostMetadata = {
    title: string;
    tags: string[];
    description?: string;
    date: Date;
    ogAttributes?: {
      paddingRight?: number;
    };
  };

  export type PostModule = {
    metadata: PostMetadata;
    MDXContent: FC<{ components: MDXComponents }>;
  };

  export const slugs: string[];
  export const postModules: Record<string, PostModule>;
}
