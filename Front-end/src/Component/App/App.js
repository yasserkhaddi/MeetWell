import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Registration from "../Authentification/Registration";
import Login from "../Authentification/Login";
import "../../Styles/app.css";
import Home from "../Home/Home";
import Loading from "../Loading/Loading";
import Profile from "../Profile/Profile";
// import AddAppoint2 from "../Home/AddAppoint2";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/test" element={<AddAppoint2 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
