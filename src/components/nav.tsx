"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import invariant from "invariant";
import { selectClass } from "@/utils";
import { Icon } from "@/components/icon";
import { ReadableArea } from "./adaptive-containers";
import { RevealHighlightPlatter, useRevealHighlight } from "./reveal-highlight";
import me from "../../data/me.json";

interface NavLinkProps {
  title: string;
  icon?: string;
  href: string;
}

function NavLink(props: NavLinkProps) {
  const { title, icon, href } = props;

  const { targetProps } = useRevealHighlight({
    insetWidth: !!icon ? 0 : 2,
    insetHeight: 4,
  });

  return (
    <Link
      className="px-3 hover:text-foreground transition-colors duration-200"
      href={props.href}
      onMouseEnter={targetProps.onMouseEnter}
      onMouseLeave={targetProps.onMouseLeave}
      onMouseDown={targetProps.onMouseDown}
      onMouseUp={targetProps.onMouseUp}
      aria-label={title}
    >
      {icon ? <Icon icon={icon as any} /> : title}
    </Link>
  );
}

function NavLinks() {
  return (
    <div className="flex flex-1 font-light text-foreground-secondary">
      <NavLink title="Notes" href="/" />
      <NavLink title="About Me" href="/" />
      <div className="flex-1" />
      {me.links.map((link) => (
        <NavLink
          key={link.title}
          title={link.title}
          icon={link.icon}
          href={link.url}
        />
      ))}
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
