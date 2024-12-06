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
import { motion, useSpring, useTransform } from "motion/react";
import { selectClass } from "@/utils";

interface LoadingBarProps {
  active: boolean;
}

function LoadingBar(props: LoadingBarProps) {
  const { active } = props;
  const widthPercent = useSpring(1, { duration: 400, bounce: 0 });
  const width = useTransform(widthPercent, (value) => `${value * 100}%`);

  useEffect(() => {
    if (active) {
      widthPercent.jump(0, true);
      widthPercent.set(0.7);
    } else {
      widthPercent.set(1);
    }
  }, [widthPercent, active]);

  return (
    <motion.div
      id="loadingBar"
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
    </motion.div>
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
