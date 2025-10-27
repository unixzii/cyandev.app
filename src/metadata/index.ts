import { useContext, useEffect } from "react";
import { UNSAFE_RouteContext } from "react-router";

import { useMetadataContext } from "./context";
import type { Metadata } from "./types";

export { MetadataContext } from "./context";

export function useMetadataProvider(metadata: Metadata) {
  const metadataContext = useMetadataContext();
  const route = useContext(UNSAFE_RouteContext);
  const thisRoute = route.matches[route.matches.length - 1];
  const routeId = thisRoute.route.id;
  useEffect(() => {
    if (routeId) {
      metadataContext.setMetadata(routeId, metadata);
    }
  }, [routeId, metadata]);
}
