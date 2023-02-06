import { useContext, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserDetailsContext } from "./state/context/UserDetailsProvider";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { IUserDetails } from "./state/types/State";

const App = () => {

  const { user } = useContext(UserDetailsContext);

  return (
    <>
      <Navbar />
      <Routes>
        {unauthenticatedRoutes(user)}
        {user && loggedInRoutes(user)}
      </Routes>
    </>
  )
}

const unauthenticatedRoutes = (user: IUserDetails) => {
  return (
    <>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
    </>
  )
}

const loggedInRoutes = (user: IUserDetails) => {
  return (
    <>
      <Route path="#Meetings" />
      <Route path="#Statistics" />
      <Route path="#Settings" />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
    </>
  )
}
export default App
