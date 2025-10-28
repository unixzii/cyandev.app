import { useEffect, useEffectEvent } from "react";
import type { DataRouter } from "react-router";

import type { Metadata } from "./types";
import { collectMetadata } from "./collector";
import { renderMetadata } from "./dom";

export function MetadataUpdater(props: {
  router: DataRouter;
  initialMetadata?: Metadata;
}) {
  const { router, initialMetadata } = props;

  const update = useEffectEvent(() => {
    const metadata = collectMetadata(router, initialMetadata || {});
    renderMetadata(metadata);
  });

  useEffect(() => {
    update();
    return router.subscribe(() => {
      update();
    });
  }, [router]);

  return null;
}
