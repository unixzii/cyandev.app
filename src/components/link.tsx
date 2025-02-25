"use client";

import { type ComponentProps, forwardRef } from "react";
import NextLink from "next/link";
import { useParams } from "next/navigation";

export type LinkProps = ComponentProps<typeof NextLink> & {
  absolute?: boolean;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { href, absolute, ...restProps } = props;
  const { locale } = useParams();
  if (absolute || typeof href !== "string") {
    return <NextLink ref={ref} href={href} {...restProps} />;
  }
  const prefix = `/${locale}${href.startsWith("/") ? "" : "/"}`;
  return <NextLink ref={ref} href={`${prefix}${href}`} {...restProps} />;
});
Link.displayName = "Link";

export default Link;
