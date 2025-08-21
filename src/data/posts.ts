import {
  type PostMetadata,
  type PostModule,
  slugs,
  postModules,
} from "post-catalog-loader!";

export type RefinedPostMetadata = Omit<PostMetadata, "date"> & {
  date: Date;
};

export type PostMetadataWithSlug = RefinedPostMetadata & {
  slug: string;
};

export type RefinedPostModule = Omit<PostModule, "metadata"> & {
  metadata: RefinedPostMetadata;
};

export const postSlugs = [...slugs].sort((a, b) => {
  const dateA = new Date(postModules[a].metadata.date);
  const dateB = new Date(postModules[b].metadata.date);
  return +dateB - +dateA;
});

export function listPosts(): PostMetadataWithSlug[] {
  return postSlugs.map((slug) => {
    const { metadata } = postModules[slug];
    return {
      ...metadata,
      date: new Date(metadata.date),
      slug,
    };
  });
}

export function getPostModule(slug: string): RefinedPostModule | null {
  const postModule = postModules[slug];
  if (!postModule) {
    return null;
  }
  const { MDXContent, metadata } = postModule;
  return {
    MDXContent,
    metadata: {
      ...metadata,
      date: new Date(metadata.date),
    },
  };
}
