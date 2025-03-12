import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import { toast, Slide } from "react-toastify";
import { deleteAdminAccount } from "../../../Redux/Admin/action";
import NavBar from "../AdminNavBar/NavBar";
import { House, SquareChevronLeft } from "lucide-react";
import "../../../Styles/admin/deleteAccount.css";

export default function DeleteAccount() {
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

  const handleDelete = (e) => {
    e.preventDefault();
    const id = userInfo._id;
    dispatch(deleteAdminAccount(id)).then((r) => {
      if (r.type === "admin/deleteAccount/fulfilled") {
        cookie.remove("access_token");
        cookie.remove("client_info");
        nav("/");
        window.location.reload();
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
      }
    });
    nav("/");
  };

  if (cancel) {
    nav("/admin/profile");
  }
  const handleNav = () => {
    nav("/admin/profile");
  };
  const handlenavHome = () => {
    nav("/admin/home");
  };

  return (
    <>
      <div className="admin_delete_container">
        <NavBar />
        <div className="appoint_deleted_title">
          <button onClick={handleNav} className="admin_fetchUser_title_button">
            <SquareChevronLeft size={40} strokeWidth={1} />
          </button>
          <button
            onClick={handlenavHome}
            className="admin_fetchUser_title_button"
          >
            <House size={40} strokeWidth={1} />
          </button>
        </div>
        <div className="admin_delete_content">
          <h2>Voulez-vous supprimer votre compte ?</h2>
          <div className="admin_delete_buttons">
            <button
              onClick={handleDelete}
              className="admin_delete_button_delete"
            >
              Supprimer
            </button>
            <button onClick={handleCancel} className="admin_cancel_button">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
