import {
  type PostMetadata,
  type PostModule,
  slugs,
  postModules,
} from "post-catalog-loader!";

export type PostMetadataWithSlug = PostMetadata & {
  slug: string;
};

export const postSlugs = [...slugs];

export function listPosts(): PostMetadataWithSlug[] {
  const realizedPosts: PostMetadataWithSlug[] = [];
  for (const slug of slugs) {
    const { metadata } = postModules[slug];
    realizedPosts.push({
      ...metadata,
      date: new Date(metadata.date),
      slug,
    });
  }
  realizedPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return realizedPosts;
}

export function getPostModule(slug: string): PostModule {
  const { MDXContent, metadata } = postModules[slug];
  return {
    MDXContent,
    metadata: {
      ...metadata,
      date: new Date(metadata.date),
    },
  };
}
