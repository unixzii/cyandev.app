import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
} from "react";
import type { DataRouter } from "react-router";

import type { Metadata } from "./types";
import { applyMetadata } from "./applier";

interface Context {
  setMetadata(routeId: string, metadata: Metadata): void;
}

const context = createContext<Context>({
  setMetadata() {
    if (import.meta.env.DEV) {
      console.error("No MetadataContext is mounted");
    }
  },
});

export function useMetadataContext() {
  return useContext(context);
}

export function MetadataContext(
  props: PropsWithChildren<{
    router: DataRouter;
    initialMetadata?: Metadata;
  }>,
) {
  const { router, initialMetadata, children } = props;
  const { Provider } = context;

  const updateRef = useRef<() => void>(null);
  const contextObject = useMemo(() => {
    const metadataMap = new Map<string, Metadata>();
    return {
      getMetadata(routeId: string): Metadata | undefined {
        return metadataMap.get(routeId);
      },
      setMetadata(routeId, metadata) {
        metadataMap.set(routeId, metadata);
        updateRef.current?.();
      },
    };
  }, [updateRef]) satisfies Context;

  const update = useEffectEvent(() => {
    const state = router.state;
    let metadata = initialMetadata || {};

    // Collect all metadata in the route tree.
    for (const match of state.matches) {
      const thisMetadata = contextObject.getMetadata(match.route.id);
      if (!thisMetadata) {
        continue;
      }
      metadata = {
        ...metadata,
        ...thisMetadata,
      };
    }

    applyMetadata(metadata);
  });
  updateRef.current = update;

  useEffect(() => {
    update();
    return router.subscribe(() => {
      update();
    });
  }, [router]);

  return <Provider value={contextObject}>{children}</Provider>;
}
