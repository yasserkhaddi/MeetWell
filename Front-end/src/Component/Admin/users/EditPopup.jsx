import React, { useState, useEffect } from "react";
import "../../../Styles/admin/editPopup.css";
import { SquareArrowUp } from "lucide-react";
import { editUser } from "../../../Redux/Admin/action";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";

export default function EditPopup({ closePopup, user, updateUser }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    dateDeNaissance: "",
    PhoneNumber: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        dateDeNaissance: user.dateDeNaissance,
        PhoneNumber: user.PhoneNumber || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.nom == "" ||
      formData.prenom == "" ||
      formData.email == "" ||
      formData.dateDeNaissance == ""
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
      dispatch(editUser({ id: user._id, formData: formData })).then((res) => {
        if (res.type === "admin/editUser/fulfilled") {
          updateUser({ ...user, ...formData });
          toast.success("Modification réussie", {
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
      closePopup();
    }
  };

  return (
    <>
      <div className="edit_user_overlay">
        <div className="edit_user_content">
          <div className="edit_user_header">
            <button onClick={closePopup} className="edit_user_button_close">
              <SquareArrowUp strokeWidth={1} />
            </button>
          </div>
          <h2>Modifier l'utilisateur</h2>
          <form onSubmit={handleSubmit} className="edit_user_form">
            <div className="edit_user_form_div">
              <label>Nom :</label>
              <input
                className="edit_user_input"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
              />
            </div>
            <div className="edit_user_form_div">
              <label>Prénom :</label>
              <input
                className="edit_user_input"
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
              />
            </div>
            <div className="edit_user_form_div">
              <label>E-mail :</label>
              <input
                className="edit_user_input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="edit_user_form_div">
              <label>Date de naissance :</label>
              <input
                className="edit_user_input"
                type="date"
                name="dateDeNaissance"
                value={formData.dateDeNaissance}
                onChange={handleChange}
              />
            </div>
            <div className="edit_user_form_div">
              <label>Numéro de téléphone :</label>
              <input
                className="edit_user_input"
                type="tel"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                pattern="^0[1-9]([.-]?[0-9]{2}){4}$"
                title="Le numéro de téléphone doit être valide, par exemple : 06 12 34 56 78"
                maxLength="13"
              />
            </div>
            <div className="edit_user_div">
              <button type="submit" className="edit_user_button_confirm">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
