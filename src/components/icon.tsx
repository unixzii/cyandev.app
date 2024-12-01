import { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faInstagram,
  faBilibili,
} from "@fortawesome/free-brands-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faEllipsisH,
  faArrowLeft,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const ICON_MAP = {
  twitter: faTwitter,
  github: faGithub,
  instagram: faInstagram,
  bilibili: faBilibili,
  ellipsis: faEllipsisH,
  arrowLeft: faArrowLeft,
  house: faHouse,
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
