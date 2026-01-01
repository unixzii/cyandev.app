import { type IconType, Icon } from "@/components/Icon";
import { useServerValue } from "@/server-data";
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
        className="flex w-10 h-10 items-center justify-center hover:text-primary font-light transition-colors duration-200"
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
  const yearString = useServerValue("copyright-year", () =>
    new Date().getFullYear(),
  );

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
