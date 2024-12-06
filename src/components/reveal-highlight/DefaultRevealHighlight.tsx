"use client";

import { useEffect } from "react";
import { type SpringOptions, motion, useSpring } from "motion/react";

type DefaultRevealHighlightProps = {
  width: number;
  height: number;
  top: number;
  left: number;
  visible: boolean;
  pressed: boolean;
};

const SPRING_OPTIONS: SpringOptions = { duration: 350, bounce: 0.12 };

export function DefaultRevealHighlight(props: DefaultRevealHighlightProps) {
  const { width, height, top, left, visible, pressed } = props;

  const animateWidth = useSpring(0, SPRING_OPTIONS);
  const animateHeight = useSpring(0, SPRING_OPTIONS);
  const animateTop = useSpring(0, SPRING_OPTIONS);
  const animateLeft = useSpring(0, SPRING_OPTIONS);
  const animateOpacity = useSpring(0, {
    duration: pressed ? 0 : 200,
    bounce: 0,
  });

  useEffect(() => {
    if (!visible) {
      animateOpacity.set(0);
      return;
    }

    if (animateOpacity.get() > 0) {
      animateWidth.set(width);
      animateHeight.set(height);
      animateTop.set(top);
      animateLeft.set(left);
    } else {
      animateWidth.jump(width);
      animateHeight.jump(height);
      animateTop.jump(top);
      animateLeft.jump(left);
    }

    animateOpacity.set(pressed ? 0.12 : 0.06);
  }, [
    width,
    height,
    top,
    left,
    visible,
    pressed,
    animateWidth,
    animateHeight,
    animateTop,
    animateLeft,
    animateOpacity,
  ]);

  return (
    <motion.div
      className="absolute pointer-events-none bg-reveal-highlight rounded-md -z-50"
      style={{
        width: animateWidth,
        height: animateHeight,
        left: animateLeft,
        top: animateTop,
        opacity: animateOpacity,
      }}
    />
  );
}
