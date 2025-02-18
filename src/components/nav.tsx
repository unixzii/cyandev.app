"use client";

import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  memo,
} from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { selectClass, useMediaQuery, useIntersection } from "@/utils";
import { ReadableArea } from "./adaptive-containers";

import "./nav.css";

function useIsMobileMode() {
  return useMediaQuery("(max-width: 640px)", false);
}

interface NavLinkProps {
  title: string;
  href: string;
}

const NavLink = memo((props: NavLinkProps) => {
  const { title, href } = props;

  return (
    <Link
      className="text-secondary hover:text-primary font-light transition-colors duration-200"
      href={href}
      aria-label={title}
    >
      {title}
    </Link>
  );
});
NavLink.displayName = "NavLink";

interface NavLinksProps {
  className?: string;
  mobile?: boolean;
}

const NavLinks = memo((props: NavLinksProps) => {
  const { mobile, className } = props;
  return (
    <div
      className={selectClass(
        {
          "flex flex-col gap-4 pb-4": mobile,
          "hidden sm:flex flex-1 gap-4 justify-end": !mobile,
        },
        className ? ` ${className}` : ""
      )}
    >
      <NavLink title="Posts" href="/" />
      <NavLink title="About Me" href="/" />
    </div>
  );
});
NavLinks.displayName = "NavLinks";

interface MobileMenuProps {
  onExpandChanged(height?: number): void;
}

const MobileMenu = memo((props: MobileMenuProps) => {
  const { onExpandChanged } = props;

  const [expanded, setExpanded] = useState(false);
  const menuInnerElementRef = useRef<HTMLDivElement>(null);

  function toggleExpanded() {
    const newValue = !expanded;
    setExpanded(newValue);
    const targetHeight = newValue
      ? menuInnerElementRef.current!!.clientHeight
      : 0;
    onExpandChanged(targetHeight);
  }

  return (
    <div className="flex flex-1">
      <div className="flex-1" />
      <button className="p-[4px]" onClick={toggleExpanded}>
        <div
          className={selectClass(
            { "cyan-mobile-menu-expanded": expanded },
            "cyan-mobile-menu-icon"
          )}
        />
      </button>
      <div
        ref={menuInnerElementRef}
        className="absolute left-0 top-[52px] w-full"
      >
        <ReadableArea>
          <NavLinks
            className={selectClass(
              {
                "opacity-0": !expanded,
              },
              "transition-opacity duration-200"
            )}
            mobile
          />
        </ReadableArea>
      </div>
    </div>
  );
});
MobileMenu.displayName = "MobileMenu";

const NavBarContents = memo(
  ({
    isMobileMode,
    onExpandChanged,
  }: {
    isMobileMode: boolean;
    onExpandChanged: (height?: number) => void;
  }) => {
    return (
      <ReadableArea className="flex items-center h-[52px]">
        <span className="font-bold cursor-default">Cyandev</span>
        {isMobileMode ? (
          <MobileMenu onExpandChanged={onExpandChanged} />
        ) : (
          <NavLinks />
        )}
      </ReadableArea>
    );
  }
);
NavBarContents.displayName = "NavBarContents";

export function NavBar() {
  const isMobileMode = useIsMobileMode();

  const [scrollDetectorElement, setScrollDetectorElement] =
    useState<HTMLDivElement | null>(null);
  const hairlineVisible = !useIntersection(scrollDetectorElement, {}, true);

  const [extraHeight, setExtraHeight] = useState(0);
  const handleExpandChanged = useCallback(
    (height?: number) => {
      setExtraHeight(height ?? 0);
    },
    [setExtraHeight]
  );
  const expanded = extraHeight > 0;

  useLayoutEffect(() => {
    if (!isMobileMode) {
      handleExpandChanged(0);
    }
  }, [isMobileMode, handleExpandChanged]);

  return (
    <Fragment>
      <motion.nav
        className={selectClass(
          {
            "border-separator bg-backdrop-tint backdrop-blur":
              hairlineVisible || expanded,
            "border-transparent": !(hairlineVisible || expanded),
          },
          "fixed top-0 w-full z-50 border-b transition-colors duration-300 overflow-hidden"
        )}
        animate={{ height: extraHeight + 52 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        <NavBarContents
          isMobileMode={isMobileMode}
          onExpandChanged={handleExpandChanged}
        />
      </motion.nav>
      <div
        id="scrollDetector"
        className="absolute top-0 w-full h-[1px]"
        ref={setScrollDetectorElement}
      />
    </Fragment>
  );
}
