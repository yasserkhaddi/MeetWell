import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Registration.css";
import { signUp } from "../../Redux/Users/actions";

export default function Registration() {
  useEffect(() => {
    document.title = "S'inscrire";
  }, []);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateDeNaissance: "",
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
    if (
      formData.dateDeNaissance == "" ||
      formData.email == "" ||
      formData.nom == "" ||
      formData.password == "" ||
      formData.prenom == ""
    ) {
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
    } else {
      try {
        dsp(signUp(formData)).then((result) => {
          if (result.type === "auth/signup/fulfilled") {
            toast.success("votre compte a été créé avec succès", {
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
            nav("/");
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="register_homepage">
        <div className="container">
          <h2>REGISTRATION</h2>
          <form className="registartion_form" onSubmit={handleSubmit}>
            <label className="reg_label">Nom :</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleOnChange}
              className="reg_input"
            />
            <label className="reg_label">Prenom :</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleOnChange}
              className="reg_input"
            />
            <label className="reg_label">Date De Naissance :</label>
            <input
              type="date"
              name="dateDeNaissance"
              value={formData.dateDeNaissance}
              onChange={handleOnChange}
              className="reg_input"
            />
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
              S'inscrire
            </button>
            <span className="to_login">
              Vous avez deja un compte&nbsp;
              <Link to="/" className="auth_links">
                se connecter !
              </Link>{" "}
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
