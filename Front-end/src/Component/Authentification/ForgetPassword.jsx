import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/Users/auth/fogetPassword.css";
import { generateEmail, searchAccounts } from "../../Redux/Users/actions";
import { toast, Slide } from "react-toastify";
import PopupConfirm from "./popupConfirm";
import Loading from "../Loading/Loading";

export default function ForgetPassword() {
  const [fEmail, setFEmail] = useState("");
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  const handlesearch = (email) => {
    if (fEmail === "") {
      toast.error("Le champ e-mail est requis.", {
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
      dispatch(searchAccounts(email)).then((r) => {
        if (r.type === "User/searchAccount/rejected") {
          toast.error("Il n'y a aucun compte associé à cet e-mail", {
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

        const utilisateur = r.payload?.user;
        setUser(utilisateur);
      });
    }
  };
  useEffect(() => {
    setUser(null);
  }, [fEmail]);

  const handlePopoup = (email) => {
    setPopup(!popup);
    dispatch(generateEmail(email));
  };

  return (
    <>
      <div className="forgot_password_container">
        <div className="forgot_password_content">
          <h2>Mot de passe oublié !</h2>
          <div className="forgot_password_form">
            <label>E-mail :</label>
            <input
              type="email"
              name="email"
              placeholder="exemple@domaine.com"
              className="forg_email"
              value={fEmail}
              onChange={(e) => {
                setFEmail(e.target.value);
                setUser(null);
              }}
            />
          </div>

          <div className={`user_info_reset_pass ${user ? "show" : ""}`}>
            <h2>Est-ce votre compte ?</h2>
            <div className="user_details_reset_pass">
              <label>Nom :</label>
              <input
                type="text"
                value={user?.nom || ""}
                className="user_details_input"
                disabled
              />
              <label>Prénom :</label>
              <input
                type="text"
                value={user?.prenom || ""}
                className="user_details_input"
                disabled
              />
              <label>Date de naissance :</label>
              <input
                type="text"
                value={user?.dateDeNaissance || ""}
                className="user_details_input"
                disabled
              />
              <button
                className="user_confirm"
                onClick={() => handlePopoup(fEmail)}
              >
                Confirmer
              </button>
            </div>
          </div>

          <div className="forgot_password_buttons">
            <button
              onClick={() => handlesearch(fEmail)}
              className="forgot_password_search"
              disabled={!!user}
            >
              Rechercher votre compte
            </button>

            <Link to="/" className="forgot_password_to_login">
              <button className="forgot_password_cancel">Annuler</button>
            </Link>
          </div>
        </div>

        {/* popup */}
        {loading && <Loading />}
      </div>
      {popup && <PopupConfirm />}
    </>
  );
}
