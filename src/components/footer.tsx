"use client";

import { FC } from "react";
import { ReadableArea } from "./adaptive-containers";
import { format as formatDate } from "date-fns";

export const Footer: FC = () => {
  return (
    <footer className="pt-6 pb-16 md:pb-24">
      <ReadableArea className="flex justify-between">
        <p className="text-foreground-tertiary text-sm font-light">
          © {formatDate(Date.now(), "yyyy")} Cyandev
        </p>
      </ReadableArea>
    </footer>
  );
};
