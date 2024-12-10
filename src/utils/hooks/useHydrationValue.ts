"use client";

import { useLayoutEffect, useState } from "react";

export default function useHydrationValue<T>(value: T, ssrValue: T) {
  const [isClient, setIsClient] = useState(false);
  useLayoutEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  return isClient ? value : ssrValue;
}
