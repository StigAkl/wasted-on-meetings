import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import css from './Navbar.module.css';
import Hamburger from './../../assets/hamburger.svg';
import NavbarLink from "./NavbarLink";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../../utils/token";

interface Props {
  isMenuOpen: boolean;
  handleMenuClick: (openState: boolean) => void;
}
const Navbar = ({ isMenuOpen, handleMenuClick }: Props) => {
  const menuRef = useRef<any>();
  const burgerRef = useRef<any>();

  const handleLinkClick = () => {
    handleMenuClick(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target)
        && isMenuOpen && !burgerRef.current.contains(event.target)) {
        handleMenuClick(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [menuRef, handleMenuClick])
  const { user, setUser } = useContext(UserDetailsContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(undefined);
    clearStorage();
    handleMenuClick(false);
    navigate("/login");
  }

  const loggedInRoutes = () => {
    return <>
      <NavbarLink to="/">Home</NavbarLink>
      <NavbarLink to="/#statistics">Statistics</NavbarLink>
      <button onClick={(handleSignOut)} className={css.logoutButton}>Log out</button>
    </>
  }

  const unAuthRoutes = () => {
    return <>
      <NavbarLink to="/login">Login</NavbarLink>
      <NavbarLink to="/signup">Signup</NavbarLink>
    </>
  }

  return (
    <header>
      <div className={css.container}>
        <Link to="/welcome">
          <h2 className={css.logo}>Wasted On Meetings</h2>
        </Link>

        <div ref={burgerRef} className={css.menuIcon} onClick={handleLinkClick}>
          <img src={Hamburger} style={{ height: 25, width: 25 }} alt="Hamburger icon" />
        </div>

        <nav ref={menuRef} className={`${css.navElements} & ${isMenuOpen && css.activeBar}`}>
          {user && loggedInRoutes()}
          {!user && unAuthRoutes()}
        </nav>
      </div>
    </header>)
}

export default Navbar;