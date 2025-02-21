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
import { makeClass, useMediaQuery, useIntersection } from "@/utils";
import { ReadableArea } from "@/components/adaptive-containers";

import "./styles.css";

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
      className="py-1 sm:py-0 text-secondary hover:text-primary font-light transition-colors duration-200"
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
      className={makeClass(
        {
          "flex flex-col gap-4 pb-4": mobile,
          "hidden sm:flex flex-1 gap-4 justify-end": !mobile,
        },
        className,
      )}
    >
      <NavLink title="posts" href="/" />
      <NavLink title="about" href="/" />
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
      ? (menuInnerElementRef.current?.clientHeight ?? 0)
      : 0;
    onExpandChanged(targetHeight);
  }

  return (
    <div className="flex flex-1">
      <div className="flex-1" />
      <button className="p-[4px]" onClick={toggleExpanded}>
        <div
          className={makeClass(
            { "cyan-mobile-menu-expanded": expanded },
            "cyan-mobile-menu-icon",
          )}
        />
      </button>
      <div
        ref={menuInnerElementRef}
        className="absolute left-0 top-[52px] w-full"
      >
        <ReadableArea>
          <NavLinks
            className={makeClass(
              {
                "opacity-0": !expanded,
              },
              "pt-2 transition-opacity duration-200",
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
        <span className="font-mono font-bold cursor-default">cyandev&#95;</span>
        {isMobileMode ? (
          <MobileMenu onExpandChanged={onExpandChanged} />
        ) : (
          <NavLinks />
        )}
      </ReadableArea>
    );
  },
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
    [setExtraHeight],
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
        className={makeClass(
          {
            "border-separator": hairlineVisible || expanded,
            "border-transparent": !(hairlineVisible || expanded),
          },
          "fixed top-0 w-full z-50 border-b bg-backdrop-tint backdrop-blur overflow-hidden",
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
