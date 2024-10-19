import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../Redux/Users/actions";
import cookie from "js-cookie";

export default function Login() {
  useEffect(() => {
    document.title = "Se Connecter";
  }, []);

  useEffect(() => {
    if (!!cookie.get("access_token")) {
      nav("/home");
    }
  }, [cookie]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();
  const dsp = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email == "" || formData.password == "") {
      toast("Remplissez tous les champs!", {
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
    try {
      dsp(logIn(formData)).then((result) => {
        if (result.type === "auth/login/fulfilled") {
          toast.success("Connexion réussie", {
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
          nav("/home");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="register_homepage">
        <div className="container_login">
          <h2>Se Connecter</h2>
          <form className="registartion_form" onSubmit={handleSubmit}>
            <label className="reg_label">E-mail :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              className="reg_input"
            />
            <label className="reg_label">Mot De Passe :</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="reg_input"
            />
            <button type="submit" className="reg_button">
              Se Connecter
            </button>
            <span className="to_login">
              Vous n'avez pas un compte&nbsp;
              <Link to="/signup" className="auth_links">
                s'inscrire !{" "}
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
