import type { DataRouter, RouteObject } from "react-router";

import type { Metadata } from "./types";

export function collectMetadata(router: DataRouter, initialMetadata: Metadata) {
  const state = router.state;
  let metadata = initialMetadata || {};

  // Collect and merge all metadata in the current route tree.
  for (const match of state.matches) {
    const thisMetadata = (match.route as RouteObject).metadata;
    if (!thisMetadata) {
      continue;
    }

    // Always concat the current title with the initial (site) title.
    let title = metadata.title;
    if (thisMetadata.title) {
      if (initialMetadata.title) {
        title = `${thisMetadata.title} | ${initialMetadata.title}`;
      } else {
        title = thisMetadata.title;
      }
    }

    metadata = {
      ...metadata,
      ...thisMetadata,
      title,
    };
  }

  return metadata;
}
