import { ReactNode } from "react"
import { NavLink } from "react-router-dom";
import css from './Navbar.module.css';

interface Props {
  onClick?: (state: boolean) => void;
  to: string;
  disableActive?: boolean;
  children: ReactNode;
}

const NavbarLink = ({ onClick, to, disableActive = false, children }: Props) => {
  return (
    <NavLink
      to={to}
      onClick={() => onClick === undefined ? undefined : onClick(false)}
      className={({ isActive }) => isActive && !disableActive ? css.active : undefined}>
      {children}
    </NavLink>)
}

export default NavbarLink;