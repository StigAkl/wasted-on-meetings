import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import css from './Navbar.module.css';
import Hamburger from './../../assets/hamburger.svg';

const Navbar = () => {

  const { user } = useContext(UserDetailsContext);
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const loggedInRoutes = () => {
    return <>
      <NavLink onClick={() => setShowNavbar(false)}
        className={({ isActive }) => isActive ? css.active : undefined}
        to="#Meetings">Meetings</NavLink>
      <NavLink onClick={() => setShowNavbar(false)}
        className={({ isActive }) => isActive ? css.active : undefined}
        to="#Statistics">Statistics</NavLink>
      <NavLink onClick={() => setShowNavbar(false)}
        className={({ isActive }) => isActive ? css.active : undefined}
        to="#Settings">Settings</NavLink>
    </>
  }

  const unAuthRoutes = () => {
    return <>
      <NavLink onClick={() => setShowNavbar(false)}
        className={({ isActive }) => isActive ? css.active : undefined}
        to="/login">Login</NavLink>
      <NavLink onClick={() => setShowNavbar(false)}
        className={({ isActive }) => isActive ? css.active : undefined}
        to="/signup">Signup</NavLink>
    </>
  }

  return (
    <header>
      <div className={css.container}>
        <Link to="/">
          <h2>WoM</h2>
        </Link>

        <div className={css.menuIcon} onClick={handleShowNavbar}>
          <img src={Hamburger} style={{ height: 25, width: 25 }} alt="Hamburger icon" />
        </div>

        <nav className={`${css.navElementsMobile} & ${showNavbar && css.activeBar}`}>
          {user && loggedInRoutes()}
          {!user && unAuthRoutes()}
        </nav>
      </div>
    </header>)
}

export default Navbar;



//responsive navbar: https://www.codevertiser.com/reactjs-responsive-navbar/