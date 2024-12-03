"use client";

import { useMemo, useSyncExternalStore } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useMediaQuery_client(query: string, ssrValue?: boolean) {
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

function useMediaQuery_server(query: string, ssrValue?: boolean) {
  return ssrValue ?? false;
}

export default typeof window !== "undefined"
  ? useMediaQuery_client
  : useMediaQuery_server;
