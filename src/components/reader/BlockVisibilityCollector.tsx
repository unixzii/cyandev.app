"use client";

import { useIntersection } from "@/utils";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface BlockVisibilityReporterContext {
  reportVisibility(
    key: string,
    containerKey: string | null,
    visible: boolean
  ): void;
}

interface BlockVisibilityConsumerContext {
  getVisibility(containerKey: string | null): boolean;
}

const reporterContext = createContext({
  reportVisibility() {},
} as BlockVisibilityReporterContext);

const consumerContext = createContext({
  getVisibility() {
    return false;
  },
} as BlockVisibilityConsumerContext);

function canonicalizeContainerKey(key: string | null): string {
  if (key === null) {
    return "__NULL_KEY__";
  }
  return String(key);
}

export function BlockVisibilityCollector(props: PropsWithChildren<{}>) {
  const [visibleContainerKeys, setVisibleContainerKeys] = useState(
    {} as Record<string, string>
  );

  const reporterContextValue = useMemo(() => {
    return {
      reportVisibility(key, containerKey, visible) {
        setVisibleContainerKeys((prev) => {
          if (visible && prev[key] === undefined) {
            return { ...prev, [key]: canonicalizeContainerKey(containerKey) };
          } else if (!visible && prev[key] !== undefined) {
            const current = { ...prev };
            delete current[key];
            return current;
          }
          return prev;
        });
      },
    } as BlockVisibilityReporterContext;
  }, [setVisibleContainerKeys]);

  const consumerContextValue = useMemo(() => {
    const visibleContainerKeySet = new Set(Object.values(visibleContainerKeys));
    return {
      getVisibility(containerKey) {
        const canonicalContainerKey = canonicalizeContainerKey(containerKey);
        return visibleContainerKeySet.has(canonicalContainerKey);
      },
    } as BlockVisibilityConsumerContext;
  }, [visibleContainerKeys]);

  return (
    <reporterContext.Provider value={reporterContextValue}>
      <consumerContext.Provider value={consumerContextValue}>
        {props.children}
      </consumerContext.Provider>
    </reporterContext.Provider>
  );
}

export function useReportBlockVisibility(
  key: string,
  containerKey?: string | null
) {
  const [element, setElement] = useState<Element | null>(null);
  const isVisible = useIntersection(element, {}, false);
  const reporter = useContext(reporterContext);
  useEffect(() => {
    if (containerKey === undefined) {
      return;
    }

    reporter.reportVisibility(key, containerKey, isVisible);
    return () => {
      reporter.reportVisibility(key, containerKey, false);
    };
  }, [key, containerKey, isVisible, reporter]);

  return setElement;
}

export function useBlockVisibilityConsumer() {
  return useContext(consumerContext);
}
