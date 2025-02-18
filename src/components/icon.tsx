import { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faBilibili,
} from "@fortawesome/free-brands-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faRss } from "@fortawesome/free-solid-svg-icons";

const ICON_MAP = {
  twitter: faTwitter,
  github: faGithub,
  bilibili: faBilibili,
  rss: faRss,
};

export type IconProps = {
  icon: keyof typeof ICON_MAP;
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
