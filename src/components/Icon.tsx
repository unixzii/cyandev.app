import type { IconBaseProps } from "react-icons";
import {
  TbBrandTwitter,
  TbBrandGithub,
  TbBrandBilibili,
  TbRss,
  TbSun,
  TbMoon,
  TbDeviceDesktop,
  TbSend,
} from "react-icons/tb";

const ICON_MAP = {
  twitter: TbBrandTwitter,
  github: TbBrandGithub,
  bilibili: TbBrandBilibili,
  rss: TbRss,
  sun: TbSun,
  moon: TbMoon,
  display: TbDeviceDesktop,
  send: TbSend,
};
export type IconType = keyof typeof ICON_MAP;

export type IconProps = {
  icon: IconType;
} & IconBaseProps;

export function Icon(props: IconProps) {
  const { icon, ...restProps } = props;
  const IconComponent = ICON_MAP[icon];
  return <IconComponent {...restProps} />;
}
