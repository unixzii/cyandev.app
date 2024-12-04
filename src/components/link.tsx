"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { useLoadingBar } from "./loading-bar";

type AppRouterInstance = ReturnType<typeof useRouter>;

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  const eventTarget = event.currentTarget;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

function linkClicked(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  router: AppRouterInstance,
  transitionExecutor: (navigate: () => void) => void
) {
  const { nodeName } = e.currentTarget;
  // anchors inside an svg have a lowercase nodeName
  const isAnchorNodeName = nodeName.toUpperCase() === "A";
  // TODO: ignore external links
  if (isAnchorNodeName && isModifiedEvent(e)) {
    // ignore click for browser’s default behavior
    return;
  }
  e.preventDefault();
  const navigate = () => {
    router.push(href);
  };
  transitionExecutor(navigate);
}

export const Link = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => {
  const { href, onClick, children, ...restProps } = props;

  const router = useRouter();
  const { withLoadingBar } = useLoadingBar();

  const anchorProps = {
    onClick(e) {
      if (typeof onClick === "function") {
        onClick(e);
      }
      if (e.defaultPrevented || !href) {
        return;
      }
      linkClicked(e, href, router, withLoadingBar);
    },
  } satisfies AnchorHTMLAttributes<HTMLAnchorElement>;

  return (
    <a ref={ref} href={href} {...anchorProps} {...restProps}>
      {children}
    </a>
  );
});
Link.displayName = "Link";
