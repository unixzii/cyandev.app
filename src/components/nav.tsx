"use client";

import { FC, Fragment, useLayoutEffect, useRef, useState } from "react";
import invariant from "invariant";
import { selectClass } from "@/utils";
import { Link } from "./link";
import { ReadableArea } from "./adaptive-containers";
import { RevealHighlightPlatter, useRevealHighlight } from "./reveal-highlight";

interface NavLinkProps {
  title: string;
  href: string;
}

function NavLink(props: NavLinkProps) {
  const { targetProps } = useRevealHighlight({ insetWidth: 2, insetHeight: 4 });

  return (
    <Link
      className="px-3 hover:text-foreground transition-colors duration-200"
      href={props.href}
      onMouseEnter={targetProps.onMouseEnter}
      onMouseLeave={targetProps.onMouseLeave}
      onMouseDown={targetProps.onMouseDown}
      onMouseUp={targetProps.onMouseUp}
    >
      {props.title}
    </Link>
  );
}

function NavLinks() {
  return (
    <div className="flex font-light text-foreground-secondary">
      <NavLink title="Notes" href="/" />
      <NavLink title="About Me" href="/" />
    </div>
  );
}

export function NavBar() {
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
        <ReadableArea className="flex">
          <span className="font-bold cursor-default mr-3">Cyandev</span>
          <RevealHighlightPlatter>
            <NavLinks />
          </RevealHighlightPlatter>
        </ReadableArea>
      </nav>
      <div className="h-16" ref={scrollDetectorElementRef} />
    </Fragment>
  );
}
