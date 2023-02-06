import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import css from './Navbar.module.css';

const Navbar = () => {

  const { user } = useContext(UserDetailsContext);

  const loggedInRoutes = () => {
    return <div>
      <NavLink className={({ isActive }) => isActive ? css.active : undefined}
        to="#Meetings">Meetings</NavLink>
      <NavLink className={({ isActive }) => isActive ? css.active : undefined}
        to="#Statistics">Statistics</NavLink>
      <NavLink className={({ isActive }) => isActive ? css.active : undefined}
        to="#Settings">Settings</NavLink>
    </div>
  }

  const unAuthRoutes = () => {
    return <div>
      <NavLink className={({ isActive }) => isActive ? css.active : undefined}
        to="/login">Login</NavLink>
      <NavLink className={({ isActive }) => isActive ? css.active : undefined}
        to="/signup">Signup</NavLink>
    </div>
  }

  return (
    <header>
      <div className={css.container}>
        <Link to="/">
          <h2>WoM</h2>
        </Link>
        <nav>
          {user && loggedInRoutes()}
          {!user && unAuthRoutes()}
        </nav>
      </div>
    </header>)
}

export default Navbar;