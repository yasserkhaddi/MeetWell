import React, { useState, useEffect } from "react";
import "../../Styles/adminHome.css";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./AdminNavBar/NavBar";
import Cards from "./Cards";

export default function AdminHome() {
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;
  const nav = useNavigate();

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (e) {
    console.error("Error parsing user cookies:", e);
    userInfo = null;
  }

  useEffect(() => {
    if (existingUser && userInfo) {
    } else {
      nav("/");
    }
  }, [existingUser, userInfo]);

  useEffect(() => {
    if (userInfo.isAdmin === false) {
      console.error("Access denied");
      nav("/");
    }
  }, [existingUser, userInfo]);

  return (
    <>
      <div>
        <NavBar />
        <Cards />
      </div>
    </>
  );
}
