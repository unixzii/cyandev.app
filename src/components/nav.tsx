"use client";

import { FC, Fragment, useLayoutEffect, useRef, useState } from "react";
import invariant from "invariant";
import { selectClass } from "@/utils";
import { Link } from "./link";
import { ReadableArea } from "./adaptive-containers";

export const NavBar: FC = () => {
  const [hairlineVisible, setHairlineVisible] = useState(false);
  const scrollDetectorElementRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scrollDetectorElement = scrollDetectorElementRef.current;
    invariant(!!scrollDetectorElement, "This should not be null");

    const ob = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0].intersectionRatio;
        setHairlineVisible(ratio < 0.1);
      },
      { threshold: [0, 0.1, 1] }
    );
    ob.observe(scrollDetectorElement);
    return () => {
      ob.disconnect();
    };
  }, [scrollDetectorElementRef, setHairlineVisible]);

  return (
    <Fragment>
      <nav
        className={selectClass({
          "fixed top-0 w-full py-4 z-50 bg-backdrop-tint backdrop-blur border-b transition-colors duration-500":
            true,
          "border-border": hairlineVisible,
          "border-transparent": !hairlineVisible,
        })}
      >
        <ReadableArea className="flex gap-6">
          <span className="font-bold cursor-default">Cyandev</span>
          <div className="flex gap-6 font-light text-foreground-secondary">
            <Link
              className="hover:text-foreground transition-colors duration-200"
              href="/"
            >
              Notes
            </Link>
            <Link
              className="hover:text-foreground transition-colors duration-200"
              href="/"
            >
              About Me
            </Link>
          </div>
        </ReadableArea>
      </nav>
      <div className="h-16" ref={scrollDetectorElementRef} />
    </Fragment>
  );
};
