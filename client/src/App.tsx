import { useContext, useEffect } from "react"
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

const App = () => {
  const { user } = useContext(UserDetailsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("USER?!", user)
      navigate("/login");
    }
  }, [])

  return (
    <>
      <Navbar />
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
      <Route path="/Settings" element={<Settings />} />
    </>
  )
}
export default App
