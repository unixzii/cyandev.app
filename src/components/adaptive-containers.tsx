import { FC, PropsWithChildren } from "react";
import { makeClass } from "@/utils";

type ReadableAreaProps = {
  className?: string;
};
export const ReadableArea: FC<PropsWithChildren<ReadableAreaProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={makeClass({}, "mx-auto max-w-3xl px-6", className)}>
      {children}
    </div>
  );
};
