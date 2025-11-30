import { type IconType } from "@/components/Icon";
import { IconLink } from "@/components/IconButton";
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
      <IconLink
        icon={icon as unknown as IconType}
        customColor
        href={href}
        aria-label={title}
      />
    </li>
  );
}

function SocialLinks() {
  return (
    <ul className="flex -ml-3 text-secondary hover:text-tertiary">
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

export const Footer = () => {
  const yearString = new Date().getFullYear();

  return (
    <footer className="pb-12 md:pb-16 flex items-start justify-between">
      <div>
        <p className="mb-2 text-secondary text-sm">© {yearString} Cyandev</p>
        <SocialLinks />
      </div>
      <ThemeSwitcher />
    </footer>
  );
};
