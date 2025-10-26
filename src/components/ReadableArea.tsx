import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";

type ReadableAreaProps = {
  className?: string;
};
export const ReadableArea: FC<PropsWithChildren<ReadableAreaProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={clsx("mx-auto max-w-3xl px-6", className)}>{children}</div>
  );
};
