"use client";

import {
  PropsWithChildren,
  MouseEventHandler,
  MouseEvent,
  SyntheticEvent,
  useContext,
  createContext,
  memo,
  useMemo,
} from "react";
import { MethodKeys } from "@/utils/types";
import { RevealHighlightPlatterAction } from "./RevealHighlightPlatter";

export interface RevealHighlightPlatterContext {
  dispatch: (action: RevealHighlightPlatterAction) => void;
}

const RevealHighlightPlatterContext =
  createContext<RevealHighlightPlatterContext | null>(null);

export const RevealHighlightPlatterContextProvider = memo<
  PropsWithChildren<{
    value: RevealHighlightPlatterContext;
  }>
>(function RevealHighlightPlatterContextProvider({ value, children }) {
  return (
    <RevealHighlightPlatterContext.Provider value={value}>
      {children}
    </RevealHighlightPlatterContext.Provider>
  );
});

function noop() {}
function wrapContextFn<T, K extends MethodKeys<T>>(
  context: T | null,
  fnName: K
): T[K] {
  if (context) {
    return context[fnName];
  }
  return noop as any;
}

function withHTMLEventTarget<R>(
  ev: SyntheticEvent,
  action: (el: HTMLElement) => R
): R | null {
  const target = ev.currentTarget;
  if (target instanceof HTMLElement) {
    return action(target);
  }
  return null;
}

export type UseRevealHighlight = {
  targetProps: {
    onMouseLeave: MouseEventHandler;
    onMouseEnter: MouseEventHandler;
    onMouseDown: MouseEventHandler;
    onMouseUp: MouseEventHandler;
  };
};

export type RevealHighlightProps = {
  insetWidth?: number;
  insetHeight?: number;
};

export function useRevealHighlight(
  props?: RevealHighlightProps
): UseRevealHighlight {
  const insetWidth = props?.insetWidth ?? 0;
  const insetHeight = props?.insetHeight ?? 0;

  const context = useContext(RevealHighlightPlatterContext);

  const targetProps = useMemo(() => {
    const dispatch = wrapContextFn(context, "dispatch");

    return {
      onMouseEnter(ev: MouseEvent) {
        withHTMLEventTarget(ev, (el) => {
          dispatch({ enter: el, insets: [insetWidth, insetHeight] });
        });
      },
      onMouseLeave(ev: MouseEvent) {
        withHTMLEventTarget(ev, (el) => {
          dispatch({ leave: el });
        });
      },
      onMouseDown(ev: MouseEvent) {
        withHTMLEventTarget(ev, (el) => {
          dispatch({ down: el, scale: 1 });
        });
      },
      onMouseUp() {
        dispatch({ up: true });
      },
    };
  }, [context, insetWidth, insetHeight]);

  return {
    targetProps,
  };
}
