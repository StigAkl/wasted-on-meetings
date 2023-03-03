import { useContext, useState } from "react"
import { Route, Routes } from "react-router-dom";
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
import Welcome from "./pages/Welcome/Welcome";

const App = () => {
  const { user } = useContext(UserDetailsContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  console.log(import.meta.env.MODE);

  return (
    <div className="container">
      <Navbar isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
      <Routes>
        {unauthenticatedRoutes()}
        {user && loggedInRoutes()}
        <Route path='*' element={<Welcome />} />
      </Routes>
    </div>
  )
}

const unauthenticatedRoutes = () => {
  if (import.meta.env.MODE === "development") {
    return (
      <>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </>
    )
  }
  return (
    <>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome />} />
    </>
  )
}

const loggedInRoutes = () => {
  if (import.meta.env.MODE === "development") {
    return (
      <>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Meetings" element={<Meetings />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Settings" element={<Settings />} />
      </>
    )
  }
  return (
    <>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome />} />
    </>
  )
}
export default App
