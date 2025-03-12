import React, { useState } from "react";
import "../../../Styles/admin/passwordPopup.css";
import { SquareChevronUp } from "lucide-react";

export default function ChangePasswordPopup({
  user,
  closePopup,
  changePassword,
}) {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = () => {
    if (newPassword.trim() === "") return;
    changePassword(user._id, newPassword);
    closePopup();
  };

  return (
    <>
      <div className="password_popup_overlay">
        <div className="password_popup">
          <div className="password_popup_header">
            <button onClick={closePopup} className="cancel_button_password">
              <SquareChevronUp />
            </button>
          </div>
          <div className="password_popup_main">
            <h2>Modifier le mot de passe</h2>
            <label>Nouveau mot de passe :</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Entrer un nouveau mot de passe"
            />
            <div className="popup_buttons">
              <button onClick={handleSubmit} className="confirm_button">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
