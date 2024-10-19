import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/home.css";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppoint } from "../../Redux/Appointments/actions";
import logo from "../../tools/logo/logo.png";
import SideBar from "../SideBar/sideBar";
import AddAppoint from "./AddAppoint";

export default function Home() {
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

  try {
    // Safely parse the cookies
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (e) {
    console.error("Error parsing user cookies:", e);
    userInfo = null; // Fallback if parsing fails
  }

  const nav = useNavigate();
  const dispatch = useDispatch();

  const { appointment, error, loading } = useSelector(
    (state) => state.appointment
  );

  if (!existingUser) {
    nav("/");
  }

  useEffect(() => {
    if (userCookies && userInfo) {
      document.title = `${userInfo.nom} ${userInfo.prenom} Rendez-Vous`;
    } else {
      nav("/");
    }
  }, [existingUser, nav, userCookies, userInfo]);

  useEffect(() => {
    if (existingUser && userInfo) {
      const userId = userInfo._id;
      dispatch(fetchAppoint(userId));
    } else {
      nav("/");
    }
  }, [existingUser, dispatch, nav, userInfo]);

  return (
    <>
      <div className="home_container">
        <SideBar />
        <div className="content">
          <div className="header">
            <img src={logo} alt="Logo" className="header_logo" />
            <div className="welcome">
              {userInfo && (
                <span className="welcome_text">
                  Bonjour {userInfo.nom} {userInfo.prenom}
                </span>
              )}
            </div>
            <hr className="first_line" />
            <div className="header_info">
              <div>
                <span className="header_span">
                  Ajouter un nouveau rendez-vous
                </span>
              </div>
              <AddAppoint />
            </div>
          </div>
          <hr className="second_line" />
          <div className="appointments">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Le jour</th>
                  <th>Le temps</th>
                  <th>Nr de téléphone</th>
                  <th>Enregistrer en</th>
                </tr>
              </thead>
              <tbody>
                {appointment ? (
                  appointment.map((e) => (
                    <tr key={e._id}>
                      <td>{e._id}</td>
                      <td>{e.day}</td>
                      <td>{e.time}</td>
                      <td>{e.phoneNumber}</td>
                      <td>{e.timeSaved}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">vous n'avez aucun rendez-vous</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
