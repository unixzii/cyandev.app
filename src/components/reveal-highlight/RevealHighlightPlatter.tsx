"use client";

import { useMemo, useReducer } from "react";
import invariant from "invariant";
import { RevealHighlightPlatterContextProvider } from "./context";
import { DefaultRevealHighlight } from "./DefaultRevealHighlight";

type RevealHighlightPlatterState = {
  hoveredElement: HTMLElement | null;
  pressedElement: HTMLElement | null;
  insets: number[];
  scale: number;
};

export type RevealHighlightPlatterAction =
  | { enter: HTMLElement; insets: number[] }
  | { leave: HTMLElement }
  | { down: HTMLElement; scale: number }
  | { up: true };

function revealHighlightPlatterReducer(
  prevState: RevealHighlightPlatterState,
  action: RevealHighlightPlatterAction
): RevealHighlightPlatterState {
  if ("enter" in action) {
    const { enter: hoveredElement, insets } = action;
    const { pressedElement: oldPressedElement, scale } = prevState;
    let pressedElement = oldPressedElement;
    if (hoveredElement && hoveredElement !== oldPressedElement) {
      pressedElement = null;
    }
    return { hoveredElement, pressedElement, insets, scale };
  } else if ("leave" in action) {
    const { pressedElement: oldPressedElement } = prevState;
    let pressedElement = oldPressedElement;
    if (prevState.hoveredElement === oldPressedElement) {
      pressedElement = null;
    }
    if (prevState.hoveredElement === action.leave) {
      return { ...prevState, hoveredElement: null, pressedElement };
    }
  } else if ("down" in action) {
    const { down: pressedElement, scale } = action;
    return {
      ...prevState,
      hoveredElement: pressedElement,
      pressedElement,
      scale,
    };
  } else if ("up" in action) {
    return { ...prevState, pressedElement: null, scale: 1 };
  } else {
    invariant(
      false,
      "Unexpected action with keys:\n" +
        Object.keys(action)
          .map((line) => `  - ${line}`)
          .join("\n")
    );
  }
  return prevState;
}

export function RevealHighlightPlatter(props: React.PropsWithChildren<{}>) {
  const { children } = props;

  const [state, dispatch] = useReducer(revealHighlightPlatterReducer, {
    hoveredElement: null,
    pressedElement: null,
    insets: [0, 0],
    scale: 1,
  });

  const context = useMemo(
    () => ({
      dispatch,
    }),
    [dispatch]
  );

  const { hoveredElement, pressedElement, insets } = state;
  const insetWidth = insets[0];
  const insetHeight = insets[1];
  const hoveredElementRect = useMemo(() => {
    if (hoveredElement) {
      return {
        top: hoveredElement.offsetTop - insetHeight,
        left: hoveredElement.offsetLeft - insetWidth,
        width: hoveredElement.offsetWidth + insetWidth * 2,
        height: hoveredElement.offsetHeight + insetHeight * 2,
      };
    }
    return { top: 0, left: 0, width: 0, height: 0 };
  }, [hoveredElement, insetWidth, insetHeight]);

  return (
    <RevealHighlightPlatterContextProvider value={context}>
      <DefaultRevealHighlight
        width={hoveredElementRect.width}
        height={hoveredElementRect.height}
        top={hoveredElementRect.top}
        left={hoveredElementRect.left}
        visible={!!hoveredElement}
        pressed={!!pressedElement && hoveredElement === pressedElement}
      />
      {children}
    </RevealHighlightPlatterContextProvider>
  );
}
