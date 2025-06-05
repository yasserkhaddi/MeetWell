import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import { resetPassword } from "../../Redux/Users/actions";
import "../../Styles/Users/auth/resetPassword.css";
import Loading from "../Loading/Loading";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [ConfPassword, setConfPassword] = useState("");

  const { loading } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.error("Lien invalide ou expiré");
      nav("/");
    }
  }, [token, nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== ConfPassword) {
      return toast.error("Les mots de passe ne correspondent pas", {
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
        dispatch(resetPassword({ token, password: ConfPassword })).then((r) => {
          if (r.type === "User/resetPassword/fulfilled") {
            toast.success("Mot de passe réinitialisé !", {
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
        toast.error(err.response?.data?.message || "Erreur serveur");
      }
    }
  };

  return (
    <>
      <div className="reset_password_container">
        <div className="resPassword_content">
          <h2>Réinitialiser votre mot de passe</h2>

          <form onSubmit={handleSubmit} className="second_password_container">
            <label>Nouveau mot de passe</label>
            <input
              className="resPassword_inpt"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirmer le mot de passe</label>
            <input
              className="resPassword_inpt"
              type="password"
              value={ConfPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <button type="submit" className="resPass_change_confirm">
              Réinitialiser
            </button>
          </form>
        </div>
        {loading && <Loading />}
      </div>
    </>
  );
}
