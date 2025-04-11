import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";
import { toast, Slide } from "react-toastify";
import { verifyPassword, changePassword } from "../../../Redux/Users/actions";
import { useNavigate } from "react-router-dom";
import "../../../Styles/Users/profile/changePassword/password.css";
import "../../../Styles/Users/profile/changePassword/password_mobile.css";

export default function Password() {
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
  }, [existingUser, userInfo, nav]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.newPassword !== confirmPass) {
      setErrors("Veuillez saisir le même mot de passe.");
    } else {
      setErrors("");
    }
  }, [formData, confirmPass]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        formData.newPassword === "" ||
        formData.oldPassword === "" ||
        confirmPass === ""
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
            verifyPassword({ id: userInfo._id, password: formData.oldPassword })
          ).then((r) => {
            if (r.type === "User/verifyPassword/fulfilled") {
              try {
                if (formData.oldPassword === confirmPass) {
                  toast.error("veuillez choisissez un autre mot de passe", {
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
                    changePassword({ id: userInfo._id, password: confirmPass })
                  ).then((r) => {
                    if (r.type === "User/changePassword/fulfilled") {
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

  return (
    <>
      <div className="password_container">
        <div className="second_password_container">
          <label> Ancien mot de passe : </label>
          <input
            className="pass_change_input"
            type="password"
            value={formData.oldPassword}
            name="oldPassword"
            onChange={handleChange}
          />
          <label> Nouveu mot de passe :</label>
          <input
            className="pass_change_input"
            type="password"
            value={formData.newPassword}
            name="newPassword"
            onChange={handleChange}
          />
          <label> Confirmer le mot de passe :</label>
          <input
            className="pass_change_input"
            type="password"
            value={confirmPass}
            name="confirmPass"
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
          />
          {errors && <div style={{ color: "red" }}> {errors} </div>}
          <div className="button_for_confirm_pass_change">
            <button
              className="pass_change_confirm"
              onClick={handleSubmit}
              type="submit"
            >
              {" "}
              Confirmer{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
