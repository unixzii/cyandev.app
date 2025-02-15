import { FC, PropsWithChildren } from "react";
import { selectClass } from "@/utils";

type ReadableAreaProps = {
  className?: string;
};
export const ReadableArea: FC<PropsWithChildren<ReadableAreaProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={selectClass({ "mx-auto max-w-3xl px-6": true }, className)}>
      {children}
    </div>
  );
};
