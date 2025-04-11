import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";
import {
  changeAdminPassword,
  verifyAdminPassword,
} from "../../../Redux/Admin/action";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NavBar from "../AdminNavBar/NavBar";
import { House, SquareChevronLeft } from "lucide-react";
import "../../../Styles/admin/changePassword.css";
import "../../../Styles/admin/changePassword_mobile.css";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

  if (!existingUser) {
    nav("/");
  }

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (err) {
    console.error("Error parsing user cookies:", err);
    userInfo = null;
  }

  useEffect(() => {
    if (existingUser && userInfo) {
    } else {
      nav("/");
    }
  }, [existingUser, userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.newPassword != confirmPass) {
      setErrors("Veuillez saisir le même mot de passe.");
    } else {
      setErrors("");
    }
  }, [formData, confirmPass]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (
        formData.newPassword == "" ||
        formData.oldPassword == "" ||
        confirmPass == ""
      ) {
        toast.error("Remplissez tous les champs!", {
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
      } else {
        if (errors != "") {
          toast.error("Veuillez saisir le même mot de passe.", {
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
        } else {
          dispatch(
            verifyAdminPassword({
              id: userInfo._id,
              password: formData.oldPassword,
            })
          ).then((r) => {
            if (r.type === "admin/verifyPassword/fulfilled") {
              try {
                if (formData.oldPassword === confirmPass) {
                  toast.error("veuillez choisir un autre mot de passe", {
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
                } else {
                  dispatch(
                    changeAdminPassword({
                      id: userInfo._id,
                      password: confirmPass,
                    })
                  ).then((r) => {
                    if (r.type === "admin/changePassword/fulfilled") {
                      toast.success(
                        "Votre mot de passe a été changé avec succès.",
                        {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                          transition: Slide,
                        }
                      );
                    }
                  });
                  setFormData({ oldPassword: "", newPassword: "" });
                  setConfirmPass("");
                }
              } catch (err) {
                console.error(err);
              }
            } else {
              toast.error("L'ancien mot de passe est incorrect", {
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
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNav = () => {
    nav("/admin/profile");
  };
  const handlenavHome = () => {
    nav("/admin/home");
  };

  return (
    <>
      <div className="admin_password_container">
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
        <div className="admin_password_content">
          <div className="admin_second_password_container">
            <label> Ancien mot de passe : </label>
            <input
              className="admin_pass_change_input"
              type="password"
              value={formData.oldPassword}
              name="oldPassword"
              onChange={handleChange}
            />
            <label> Nouveu mot de passe :</label>
            <input
              className="admin_pass_change_input"
              type="password"
              value={formData.newPassword}
              name="newPassword"
              onChange={handleChange}
            />
            <label> Confirmer le mot de passe :</label>
            <input
              className="admin_pass_change_input"
              type="password"
              value={confirmPass}
              name="confirmPass"
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
            {errors && <div style={{ color: "red" }}> {errors} </div>}
            <div className="admin_button_for_confirm_pass_change">
              <button
                className="admin_pass_change_confirm"
                onClick={handleSubmit}
                type="submit"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
