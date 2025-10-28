import { Link } from "react-router";

import { Logo } from "./Logo";

interface NavBarProps {
  hideHome?: boolean;
}

export const NavBar = (props: NavBarProps) => {
  const { hideHome } = props;

  return (
    <nav className="flex h-24 items-center">
      {hideHome ? null : (
        <Link className="font-mono font-bold" to="/">
          <Logo />
        </Link>
      )}
    </nav>
  );
};
