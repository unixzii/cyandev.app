import type { FC } from "react";
import { format as formatDate } from "date-fns";
import { ReadableArea } from "./ReadableArea";
import { type IconType, Icon } from "@/components/Icon";
import me from "@/../data/me.json";
import { ThemeSwitcher } from "./ThemeSwitcher";

function SocialLink({
  title,
  icon,
  href,
}: {
  title: string;
  icon: string;
  href: string;
}) {
  return (
    <li>
      <a
        className="flex w-8 h-8 items-center justify-center text-secondary hover:text-primary font-light transition-colors duration-200"
        href={href}
        aria-label={title}
      >
        <Icon icon={icon as unknown as IconType} size="18px" />
      </a>
    </li>
  );
}

function SocialLinks() {
  return (
    <ul className="flex gap-1 -ml-2">
      {me.links.map((link) => (
        <SocialLink
          key={link.title}
          title={link.title}
          icon={link.icon}
          href={link.url}
        />
      ))}
    </ul>
  );
}

export const Footer: FC = () => {
  return (
    <footer className="pb-12 md:pb-16">
      <ReadableArea className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-secondary text-sm">
            © {formatDate(Date.now(), "yyyy")} Cyandev
          </p>
          <SocialLinks />
        </div>
        <ThemeSwitcher />
      </ReadableArea>
    </footer>
  );
};
