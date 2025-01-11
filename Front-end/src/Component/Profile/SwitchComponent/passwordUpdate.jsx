import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../Styles/password.css";
import cookie from "js-cookie";
import { toast, Slide } from "react-toastify";
import { verifyPassword } from "../../../Redux/Users/actions";
import { useNavigate } from "react-router-dom";

export default function Password() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error, user } = useSelector((state) => state.users);

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
  // console.log(userInfo._id);

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
      console.log(formData.oldPassword);
      dispatch(
        verifyPassword({ id: userInfo._id, Password: formData.oldPassword })
      ).then((r) => {
        console.log(r);
      });
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
            <button className="pass_change_confirm" onClick={handleSubmit}>
              {" "}
              Confirmer{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
