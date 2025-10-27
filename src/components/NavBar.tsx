import { Link } from "react-router";

import { Logo } from "./Logo";

export const NavBar = () => {
  return (
    <nav className="flex h-24 items-center">
      <Link className="font-mono font-bold" to="/">
        <Logo />
      </Link>
    </nav>
  );
};
