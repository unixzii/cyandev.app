"use client";

import {
  type TransitionFunction,
  type PropsWithChildren,
  createContext,
  startTransition,
  useMemo,
  useTransition,
  useContext,
  useEffect,
} from "react";
import { animated, useSpringValue } from "@react-spring/web";
import { selectClass } from "@/utils";

interface LoadingBarProps {
  active: boolean;
}

function LoadingBar(props: LoadingBarProps) {
  const { active } = props;
  const width = useSpringValue("100%", {
    config: {
      mass: 1,
      friction: 51,
      tension: 500,
      precision: 0.001,
    },
  });

  useEffect(() => {
    if (active) {
      width.set("0%");
      width.start("70%");
    } else {
      width.start("100%");
    }
  }, [active]);

  return (
    <animated.div
      className={selectClass(
        {
          "duration-150": active,
          "opacity-0 duration-500 delay-100": !active,
        },
        "fixed left-[-1px] top-0 h-[2px] rounded-[1px] bg-accent z-[9999] transition-opacity"
      )}
      style={{ width }}
    >
      <div className="absolute right-0 h-[2px] w-[2px] rounded-[1px] shadow-sm shadow-[#85d8ff] dark:shadow-[#70e2ff] bg-[#85d8ff] dark:bg-[#70e2ff]" />
    </animated.div>
  );
}

export interface LoadingBarContext {
  withLoadingBar(scope: TransitionFunction): void;
}

const defaultContextValue: LoadingBarContext = {
  withLoadingBar(scope) {
    startTransition(scope);
  },
};

const context = createContext(defaultContextValue);

export function useLoadingBar(): LoadingBarContext {
  return useContext(context);
}

export function LoadingBarContainer(props: PropsWithChildren<{}>) {
  const [isPending, startTransition] = useTransition();
  const contextValue = useMemo(
    () =>
      ({
        withLoadingBar(scope) {
          startTransition(scope);
        },
      }) satisfies LoadingBarContext,
    [startTransition]
  );

  return (
    <context.Provider value={contextValue}>
      {props.children}
      <LoadingBar active={isPending} />
    </context.Provider>
  );
}
