import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/DeleteAccount.css";
import { deleteAccount } from "../../../Redux/Users/actions";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import { toast, Slide } from "react-toastify";

export default function () {
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

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

  const [cancel, setCancel] = useState(false);
  const handleCancel = (e) => {
    e.preventDefault();
    setCancel(true);
  };
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { error, user, loading } = useSelector((state) => state.users);
  const handleDelete = (e) => {
    e.preventDefault();
    const id = userInfo._id;
    dispatch(deleteAccount(id)).then((r) => {
      if (r.type === "User/deleteAccount/fulfilled") {
        cookie.remove("access_token");
        cookie.remove("client_info");
        nav("/");
        toast.success("Votre compte a été supprimé avec succès.", {
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
        // window.location.reload();
      }
    });
    nav("/");
  };

  if (cancel) {
    nav("/home");
  }

  return (
    <>
      <div className="delete_container">
        <div className="delete_content">
          <h2>Voulez-vous supprimer votre compte ?</h2>
          <div className="delete_buttons">
            <button onClick={handleDelete} className="delete_button_delete">
              Supprimer
            </button>
            <button onClick={handleCancel} className="cancel_button">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
