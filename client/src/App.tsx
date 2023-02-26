import { useContext, useEffect, useState } from "react"
import { useNavigate, Route, Routes } from "react-router-dom";
import { UserDetailsContext } from "./state/context/UserDetailsProvider";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Meetings from "./pages/Meetings";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Create from "./pages/Create/Create";
import './variables.module.css';

const App = () => {
  const { user } = useContext(UserDetailsContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [])

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
      <div className="container">
        <Routes>
          {unauthenticatedRoutes()}
          {user && loggedInRoutes()}
        </Routes>
      </div>
    </>
  )
}

const unauthenticatedRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  )
}

const loggedInRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/Meetings" element={<Meetings />} />
      <Route path="/Statistics" element={<Statistics />} />
      <Route path="/Create" element={<Create />} />
      <Route path="/Settings" element={<Settings />} />
    </>
  )
}
export default App
