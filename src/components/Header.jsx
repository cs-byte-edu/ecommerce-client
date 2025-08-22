import { HeaderTop } from "./HeaderTop";
import { NavBar } from "./NavBar";

export const Header = ({ navItems }) => {
  return (
    <header className="bg-[var(--c-primary-light)]">
      <HeaderTop />
      <NavBar navItems={navItems} />
    </header>
  );
};
