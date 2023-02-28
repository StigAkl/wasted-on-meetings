import { RefObject, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import css from './Navbar.module.css';
import Hamburger from './../../assets/hamburger.svg';
import NavbarLink from "./NavbarLink";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../../utils/token";

interface Props {
  isMenuOpen: boolean;
  handleMenuClick: () => void;
}
const Navbar = ({ isMenuOpen, handleMenuClick }: Props) => {
  const menuRef = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        handleMenuClick();
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
    handleMenuClick();
    navigate("/login");
  }

  const loggedInRoutes = () => {
    return <>
      <NavbarLink to="/" onClick={handleMenuClick}>Home</NavbarLink>
      <NavbarLink to="/#statistics" onClick={handleMenuClick}>Statistics</NavbarLink>
      <button onClick={(handleSignOut)} className={css.logoutButton}>Log out</button>
    </>
  }

  const unAuthRoutes = () => {
    return <>
      <NavbarLink to="/login" onClick={handleMenuClick}>Login</NavbarLink>
      <NavbarLink to="/signup" onClick={handleMenuClick}>Signup</NavbarLink>
    </>
  }

  return (
    <header>
      <div className={css.container}>
        <Link to="/welcome">
          <h2 className={css.logo}>Wasted On Meetings</h2>
        </Link>

        <div className={css.menuIcon} onClick={handleMenuClick}>
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