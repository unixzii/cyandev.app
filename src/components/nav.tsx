"use client";

import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  memo,
} from "react";
import { motion } from "motion/react";
import { selectClass, useMediaQuery, useIntersection } from "@/utils";
import { Icon } from "@/components/icon";
import { Link } from "./link";
import { ReadableArea } from "./adaptive-containers";
import { RevealHighlightPlatter, useRevealHighlight } from "./reveal-highlight";
import me from "../../data/me.json";

import "./nav.css";

function useIsMobileMode() {
  return useMediaQuery("(max-width: 640px)", false);
}

interface NavLinkProps {
  title: string;
  icon?: string;
  href: string;
  mobile?: boolean;
}

const NavLink = memo((props: NavLinkProps) => {
  const { title, icon, href, mobile } = props;

  const { targetProps } = useRevealHighlight({
    insetWidth: !!icon ? 0 : 2,
    insetHeight: 4,
  });

  return (
    <Link
      className={selectClass(
        { "px-3": !mobile },
        "hover:text-foreground transition-colors duration-200"
      )}
      href={href}
      onMouseEnter={targetProps.onMouseEnter}
      onMouseLeave={targetProps.onMouseLeave}
      onMouseDown={targetProps.onMouseDown}
      onMouseUp={targetProps.onMouseUp}
      aria-label={title}
    >
      {icon ? (
        <Icon icon={icon as any} size={mobile ? "lg" : undefined} />
      ) : (
        title
      )}
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
          "hidden sm:flex flex-1": !mobile,
        },
        "font-light text-foreground-secondary" +
          (className ? ` ${className}` : "")
      )}
    >
      <NavLink title="Notes" href="/" mobile={mobile} />
      <NavLink title="About Me" href="/" mobile={mobile} />
      <div className={mobile ? "hidden" : "flex-1"} />
      <div className={mobile ? "flex gap-6" : "contents"}>
        {me.links.map((link) => (
          <NavLink
            key={link.title}
            title={link.title}
            icon={link.icon}
            href={link.url}
            mobile={mobile}
          />
        ))}
      </div>
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
        <span className="font-bold cursor-default mr-3">Cyandev</span>
        {isMobileMode ? (
          <MobileMenu onExpandChanged={onExpandChanged} />
        ) : (
          <RevealHighlightPlatter>
            <NavLinks />
          </RevealHighlightPlatter>
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
            "border-border bg-backdrop-tint backdrop-blur":
              hairlineVisible || expanded,
            "border-transparent": !(hairlineVisible || expanded),
          },
          "fixed top-0 w-full z-50 border-b transition-colors duration-500 overflow-hidden"
        )}
        animate={{ height: extraHeight + 52 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
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
