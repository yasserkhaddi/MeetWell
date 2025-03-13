import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../Styles/Registration.css";
import { addUser } from "../../../../Redux/Admin/action";
import logo from "../../../../tools/logo/logo.png";
import Loading from "../../../Loading/Loading";
import NavBar from "../../AdminNavBar/NavBar";
import { Trash2, SquareChevronLeft, House } from "lucide-react";

export default function AddUser() {
  useEffect(() => {
    document.title = "Ajouter un utilisateur";
  }, []);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    email: "",
    password: "",
  });

  const [errorTriggered, setErrorTriggered] = useState(false);

  const nav = useNavigate();
  const dsp = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (error && !errorTriggered) {
      setErrorTriggered(false);
    }
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
        dsp(addUser(formData)).then((result) => {
          if (result.type === "admin/add-user/fulfilled") {
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
            nav("/admin/access");
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (error && !errorTriggered) {
      toast.error("E-mail déjà existant", {
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
      setErrorTriggered(true);
    }
  }, [error, errorTriggered]);

  const handleNav = () => {
    nav("/admin/access");
  };

  const handlenavHome = () => {
    nav("/admin/home");
  };

  return (
    <>
      <div className="register_homepage">
        <NavBar />
        <div className="to_update">
          <div className="admin_user_appointment_title">
            <button
              onClick={handleNav}
              className="admin_fetchUser_title_button"
            >
              <SquareChevronLeft size={40} strokeWidth={1} />
            </button>
            <button
              onClick={handlenavHome}
              className="admin_fetchUser_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
          </div>
        </div>
        <div className="container_two">
          <div className="first_half">
            <h2>INSCRIPTION</h2>
            <form className="registartion_form" onSubmit={handleSubmit}>
              <label className="reg_label">Nom :</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleOnChange}
                className="reg_input"
              />
              <label className="reg_label">Prénom :</label>
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
                Vous avez déjà un compte?&nbsp;
                <Link to="/" className="auth_links">
                  Se connecter !
                </Link>{" "}
              </span>
            </form>
          </div>
          <hr className="centre_line" />
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
