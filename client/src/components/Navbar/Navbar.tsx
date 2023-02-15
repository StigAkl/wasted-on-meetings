import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import css from './Navbar.module.css';
import Hamburger from './../../assets/hamburger.svg';
import NavbarLink from "./NavbarLink";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../../utils/token";

const Navbar = () => {

  const { user, setUser } = useContext(UserDetailsContext);
  const [showNavbar, setShowNavbar] = useState(false)
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(undefined);
    clearStorage();
    navigate("/login");
    setShowNavbar(false);
  }

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const loggedInRoutes = () => {
    return <>
      <NavbarLink to="/" onClick={setShowNavbar}>Home</NavbarLink>
      <NavbarLink to="/statistics" onClick={setShowNavbar}>Statistics</NavbarLink>
      <button onClick={(handleSignOut)} className={css.logoutButton}>Log out</button>
    </>
  }

  const unAuthRoutes = () => {
    return <>
      <NavbarLink to="/login" onClick={setShowNavbar}>Login</NavbarLink>
      <NavbarLink to="/signup" onClick={setShowNavbar}>Signup</NavbarLink>
    </>
  }

  return (
    <header>
      <div className={css.container}>
        <Link to="/">
          <h2 className={css.logo}>Wasted On Meetings</h2>
        </Link>

        <div className={css.menuIcon} onClick={handleShowNavbar}>
          <img src={Hamburger} style={{ height: 25, width: 25 }} alt="Hamburger icon" />
        </div>

        <nav className={`${css.navElements} & ${showNavbar && css.activeBar}`}>
          {user && loggedInRoutes()}
          {!user && unAuthRoutes()}
        </nav>
      </div>
    </header>)
}

export default Navbar;



//responsive navbar: https://www.codevertiser.com/reactjs-responsive-navbar/