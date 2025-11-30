import { type ComponentProps, createElement } from "react";
import type { JSX } from "react/jsx-runtime";
import clsx from "clsx";

import { type IconType, Icon } from "./Icon";

interface IconButtonProps {
  className?: string;
  icon: IconType;
  customColor?: boolean;
}

function createIconComponent<T extends keyof JSX.IntrinsicElements>(type: T) {
  function IconComponent(props: IconButtonProps & ComponentProps<T>) {
    const { className, icon, customColor, ...restProps } = props;
    const finalClassName = clsx(
      "flex w-10 h-10 items-center justify-center hover:text-primary font-light transition-colors duration-200",
      { "text-secondary": !customColor },
      className,
    );
    return createElement(
      type,
      { ...restProps, className: finalClassName },
      <Icon icon={icon} size="18px" />,
    );
  }
  return IconComponent;
}

export const IconButton = createIconComponent("button");
export const IconLink = createIconComponent("a");
