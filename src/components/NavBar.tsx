import { Link } from "react-router";
import clsx from "clsx";

import { Logo } from "./Logo";

interface NavBarProps {
  hideHome?: boolean;
}

export const NavBar = (props: NavBarProps) => {
  const { hideHome } = props;

  return (
    <nav
      className={clsx(
        "flex h-24 items-center transition-transform ease-out-cubic duration-500",
        {
          "-translate-x-24": hideHome,
        },
      )}
    >
      <Link
        className={clsx(
          "inline-block w-24 font-mono font-bold transition-opacity duration-300",
          {
            "opacity-0": hideHome,
          },
        )}
        to="/"
      >
        <Logo />
      </Link>
      <Link
        className={clsx(
          "text-secondary hover:text-primary transition-all duration-300",
          { "opacity-0": !hideHome },
        )}
        to="/page/about"
      >
        about
      </Link>
    </nav>
  );
};
