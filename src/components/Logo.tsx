import { useEffect, useState } from "react";
import { clsx } from "clsx";

type AnimationData = {
  c?: string;
  s?: number;
  m?: boolean;
  t: number;
};

const animationData: AnimationData[] = [
  { c: "c", t: 1000 },
  { c: "cy", t: 114 },
  { c: "cya", t: 88 },
  { c: "cyan", t: 168 },
  { c: "cyand", t: 119 },
  { c: "cyande", t: 42 },
  { c: "cyandev", t: 301 },
  { s: 1, t: 20 },
  { s: 2, t: 52 },
  { s: 3, t: 20 },
  { s: 4, t: 20 },
  { s: 5, t: 20 },
  { s: 6, t: 113 },
  { s: 7, t: 89 },
  { m: true, t: 700 },
  { t: 510 },
];

type State = {
  content: string;
  selectionLength?: number;
  monoFont: boolean;
  animating: boolean;
};

export type LogoProps = {
  animated?: boolean;
};

let animationAllowed = true;

export function disableAnimation() {
  animationAllowed = false;
}

export function isAnimationAllowed() {
  return animationAllowed;
}

export const Logo = ({ animated }: LogoProps) => {
  const [state, setState] = useState<State>(
    animated
      ? { content: "", monoFont: false, animating: true }
      : {
        content: "cyandev",
        monoFont: true,
        animating: false,
      },
  );
  useEffect(() => {
    if (!animated) {
      return () => {};
    }

    let cancelled = false;
    let frame = 0;

    function step() {
      if (cancelled) {
        return;
      }

      if (frame >= animationData.length) {
        setState((s) => ({
          ...s,
          selectionLength: undefined,
          animating: false,
        }));
        return;
      }

      const frameData = animationData[frame++];
      setTimeout(() => {
        if (cancelled) {
          return;
        }

        setState((s) => ({
          ...s,
          content: frameData.c ?? s.content,
          selectionLength: frameData.s ?? s.selectionLength,
          monoFont: frameData.m ?? s.monoFont,
        }));
        step();
      }, frameData.t);
    }

    step();

    return () => {
      cancelled = true;
    };
  }, [animated, setState]);

  return (
    <>
      {Array.from(state.content).map((ch, i) => (
        <span
          key={i}
          className={clsx({
            "select-none": state.animating,
            "font-mono": state.monoFont,
            "bg-primary/15": state.selectionLength && state.selectionLength > i,
          })}
        >
          {ch}
        </span>
      ))}
      <span
        className={clsx("select-none font-mono", {
          "animate-cursor-blink": !state.animating,
          "opacity-0": !!state.selectionLength,
        })}
      >
        _
      </span>
    </>
  );
};
