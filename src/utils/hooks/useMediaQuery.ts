"use client";

import { useMemo, useSyncExternalStore } from "react";

export default function useMediaQuery(query: string) {
  const { subscribe, getSnapshot } = useMemo(() => {
    const queryList = window.matchMedia(query);
    return {
      subscribe(callback: () => void) {
        queryList.addEventListener("change", callback);
        return () => {
          queryList.removeEventListener("change", callback);
        };
      },
      getSnapshot() {
        return queryList.matches;
      },
    };
  }, [query]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
