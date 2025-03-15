import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/home.css";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppoint,
  deleteAppoint,
  expiredAppointment,
} from "../../Redux/Appointments/actions";
import logo from "../../tools/logo/logo.png";
import SideBar from "../SideBar/sideBar";
import AddAppoint from "./AddAppoint";
import { Trash2 } from "lucide-react";
import Clock from "../Clock/Clock";
import { toast, Slide } from "react-toastify";

export default function Home() {
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (e) {
    console.error("Error parsing user cookies:", e);
    userInfo = null;
  }

  const nav = useNavigate();
  const dispatch = useDispatch();

  const { appointment, expiredAppointments, error, loading } = useSelector(
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
  }, [dispatch, appointment]);
  const sortedAppointments =
    appointment && appointment.length > 0
      ? [...appointment].sort((a, b) => {
          const dateA = new Date(a.date + " " + a.time);
          const dateB = new Date(b.date + " " + b.time);
          return dateA - dateB;
        })
      : [];

  const handleExpiredAppointments = async () => {
    await dispatch(expiredAppointment());
  };

  useEffect(() => {
    handleExpiredAppointments();
  }, []);

  const handleDeleteAppoint = (id) => {
    try {
      dispatch(deleteAppoint(id)).then((r) => {
        if (r.type === "appoint/delete/fulfilled") {
          toast.success("rendez-vous supprimez avec success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="home_container">
        <SideBar />
        <div className="content">
          <div className="header">
            <div className="header_top">
              <div className="header_top_left">
                <img src={logo} alt="Logo" className="header_logo" />
                <div className="welcome">
                  {userInfo && (
                    <span className="welcome_text">
                      Bonjour {userInfo.nom} {userInfo.prenom}
                    </span>
                  )}
                </div>
              </div>
              <div className="header_top_right">
                <Clock />
              </div>
            </div>
            <hr className="first_line" />
            <div className="header_info">
              <div>
                <span className="header_span">
                  Ajouter un nouveau rendez-vous
                </span>
              </div>
              <AddAppoint userInfo={userInfo} />
            </div>
          </div>
          <hr className="second_line" />
          <div className="appointments">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Créneau réservé</th>
                  <th>Nr de téléphone</th>
                  {/* <th>Description</th> */}
                  <th>Enregistré en</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedAppointments.length > 0 ? (
                  sortedAppointments.map((e) => (
                    <tr key={e._id}>
                      <td>{e._id}</td>
                      <td>{e.date}</td>
                      <td>{e.time}</td>
                      <td>{e.phoneNumber}</td>
                      {/* <td className="description">{e.description}</td> */}
                      <td>{e.timeSaved}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteAppoint(e._id)}
                          className="delete_button"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="appoint_false">
                      Vous n'avez aucun rendez-vous
                    </td>
                    <td className="td_disabled"></td>
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
