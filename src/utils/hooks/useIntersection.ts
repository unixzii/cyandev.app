"use client";

import { useMemo, useSyncExternalStore } from "react";
import useHydrationValue from "./useHydrationValue";

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

const isServer = typeof window === "undefined";

export default function useIntersection<T extends Element>(
  element: T | null,
  options: UseIntersectionOptions,
  ssrValue?: boolean
) {
  const { threshold, rootMargin } = options;
  const { subscribe, getSnapshot } = useMemo(() => {
    if (!element || isServer) {
      return {
        subscribe() {
          return () => {};
        },
        getSnapshot(): boolean {
          return ssrValue ?? false;
        },
      };
    }

    let isIntersecting = ssrValue ?? false;
    let subscriptionCallback: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries, thisObserver) => {
        if (subscriptionCallback) {
          isIntersecting = entries[0].isIntersecting;
          subscriptionCallback();
        } else {
          thisObserver.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    return {
      subscribe(callback: () => void) {
        subscriptionCallback = callback;
        observer.observe(element);
        return () => {
          subscriptionCallback = undefined;
          observer.disconnect();
        };
      },
      getSnapshot() {
        return isIntersecting;
      },
    };
  }, [element, threshold, rootMargin, ssrValue]);
  const isIntersecting = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );
  return useHydrationValue(isIntersecting, ssrValue ?? false);
}
