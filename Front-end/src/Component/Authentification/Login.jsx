import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logIn, GoogleAuth } from "../../Redux/Users/actions";
import cookie from "js-cookie";
import logo from "../../tools/logo/logo.png";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../tools/firebase/firebase";
import "../../Styles/Users/auth/Registration_mobile.css";

export default function Login() {
  useEffect(() => {
    document.title = "Se Connecter";
  }, []);

  useEffect(() => {
    if (!!cookie.get("access_token")) {
      nav("/home");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();
  const dsp = useDispatch();

  const { loading, error } = useSelector((state) => state.users);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
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
      return;
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

          if (result.payload?.user.isAdmin) {
            nav("/admin/home");
          } else {
            nav("/home");
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Adresse e-mail ou mot de passe incorrect", {
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
  }, [error]);

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const firstName = result.user.displayName.split(" ")[0];
      const lastName = result.user.displayName.split(" ")[1];
      console.log(result.user);
      const r = result.user;
      const userData = {
        email: r.email,
        nom: lastName,
        prenom: firstName,
        dateDeNaissance: "2000-01-01",
      };
      await dsp(GoogleAuth(userData)).then((result) => {
        if (result.type === "auth/google/fulfilled") {
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

          if (result.payload?.user.isAdmin) {
            nav("/admin/home");
          } else {
            nav("/home");
            if (result.payload?.user.firstTime) {
              window.alert("test");
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="register_homepage">
        <div className="container_login">
          <div className="first_half">
            <h2>Se Connecter</h2>
            <form className="registartion_form" onSubmit={handleSubmit}>
              <label className="reg_label">E-mail :</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                className="reg_input_login"
              />
              <label className="reg_label">Mot De Passe :</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                className="reg_input_login"
              />
              <button type="submit" className="reg_button">
                Se Connecter
              </button>
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="google_auth"
              >
                Continuer avec Google
              </button>
              <span className="to_login">
                Vous n'avez pas un compte?&nbsp;
                <Link to="/signup" className="auth_links">
                  S'inscrire !
                </Link>
              </span>
              <span className="foget_password">
                <Link to="/forgot-password" className="auth_links">
                  Mot de passe oublié ?
                </Link>
              </span>
            </form>
          </div>
          <hr className="center_line" />
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="logo_two">
          <img src={logo} alt="logo" />
        </div>
        {loading && <Loading />}
      </div>
    </>
  );
}
