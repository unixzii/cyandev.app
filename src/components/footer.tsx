import { FC } from "react";
import Link from "next/link";
import { format as formatDate } from "date-fns";
import { ReadableArea } from "./adaptive-containers";
import { Icon } from "./icon";
import me from "../../data/me.json";

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
      <Link
        className="flex w-[32px] h-[32px] items-center justify-center text-secondary hover:text-primary font-light transition-colors duration-200"
        href={href}
        aria-label={title}
      >
        <Icon icon={icon as any} />
      </Link>
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
    <footer className="pb-16 md:pb-20">
      <ReadableArea className="flex justify-between">
        <div>
          <p className="mb-2 text-secondary text-sm font-light">
            © {formatDate(Date.now(), "yyyy")} Cyandev
          </p>
          <SocialLinks />
        </div>
      </ReadableArea>
    </footer>
  );
};
