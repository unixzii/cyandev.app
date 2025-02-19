import { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faBilibili,
} from "@fortawesome/free-brands-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faRss,
  faSun,
  faMoon,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";

const ICON_MAP = {
  twitter: faTwitter,
  github: faGithub,
  bilibili: faBilibili,
  rss: faRss,
  sun: faSun,
  moon: faMoon,
  display: faDisplay,
};
export type IconType = keyof typeof ICON_MAP;

export type IconProps = {
  icon: IconType;
  size?: SizeProp;
  className?: string;
  style?: CSSProperties;
};

export function Icon(props: IconProps) {
  return (
    <FontAwesomeIcon
      className={props.className}
      style={props.style}
      icon={ICON_MAP[props.icon]}
      size={props.size}
    />
  );
}
