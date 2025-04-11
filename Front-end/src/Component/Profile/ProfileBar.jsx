import React from "react";
import "../../Styles/Users/profile/profileBar/profileBar.css";
import "../../Styles/Users/profile/profileBar/profileBar_mobile.css";

export default function ProfileBar({ selectedOption, onOptionClick }) {
  const options = [
    { text: "Information personnelle", case: 1 },
    { text: "Changer le mot de passe", case: 2 },
    { text: "Supprimez votre compte", case: 3 },
  ];

  return (
    <div className="profile_bar">
      {options.map((option) => (
        <div
          key={option.case}
          className={`profile_bar_option ${
            selectedOption === option.case ? "active" : ""
          }`}
          onClick={() => onOptionClick(option.case)}
        >
          {option.text}
        </div>
      ))}
    </div>
  );
}
