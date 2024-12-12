"use client";

import { memo, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBlockVisibilityConsumer } from "@/components/reader/BlockVisibilityCollector";
import { type HeadingInfo, getHeadings } from "@/data/block-utils";
import type { BlockObject } from "@/data/block-types";
import { selectClass, useMediaQuery } from "@/utils";

interface TocLineProps {
  heading: HeadingInfo;
  highlighted: boolean;
}

const TocLine = memo((props: TocLineProps) => {
  const { heading, highlighted } = props;
  const isTopLevel = heading.level === 1;
  return (
    <div
      className={selectClass(
        {
          "w-[18px]": isTopLevel,
          "w-[14px]": !isTopLevel,
          "shadow-md-no-offset shadow-transparent dark:shadow-white":
            highlighted,
          "opacity-20": !highlighted,
        },
        "h-[2px] rounded-[1px] bg-foreground-secondary dark:bg-white transition-opacity duration-200"
      )}
    ></div>
  );
});
TocLine.displayName = "TocLine";

export interface TocProps {
  body: unknown;
}

export function Toc(props: TocProps) {
  const { body } = props;
  const blocks = body as BlockObject[];
  const headings = useMemo(() => {
    return getHeadings(blocks);
  }, [blocks]);

  const visible = useMediaQuery(
    "(min-width: 1024px) and (min-height: 600px)",
    false
  );

  const blockVisibilityConsumer = useBlockVisibilityConsumer();

  if (!visible) {
    return <AnimatePresence />;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed flex top-0 right-0 w-16 pr-8 h-screen items-center justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col items-end gap-3">
          {headings.map((heading) => (
            <TocLine
              key={heading.key}
              heading={heading}
              highlighted={blockVisibilityConsumer.getVisibility(heading.key)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
