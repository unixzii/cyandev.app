"use client";

import { useMemo, useSyncExternalStore } from "react";
import useHydrationValue from "./useHydrationValue";

const isServer = typeof window === "undefined";

export default function useMediaQuery(query: string, ssrValue?: boolean) {
  const { subscribe, getSnapshot } = useMemo(() => {
    if (isServer) {
      return {
        subscribe() {
          return () => {};
        },
        getSnapshot() {
          return ssrValue ?? false;
        },
      };
    }

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
  }, [query, ssrValue]);
  const matches = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return useHydrationValue(matches, ssrValue ?? false);
}
