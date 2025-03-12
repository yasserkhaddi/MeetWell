import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../Styles/cards.css";

export default function Cards() {
  const [cards, setCards] = useState([]);

  const adminCards = [
    { name: "Utilisateurs", link: "/admin/users" },
    { name: "Rendez-vous", link: "/admin/appointments" },
    { name: "Ajouter un rendez-vous", link: "/admin/add/appointments" },
    { name: "Rendez-vous expirés", link: "/admin/expired-appointments" },
    {
      name: "Rendez-vous supprimés par l'Utilisateur",
      link: "/admin/appointments-deleted-by-user",
    },
    {
      name: "Rendez-vous supprimés par l'administrateur",
      link: "/admin/appointments-deleted",
    },
  ];

  useEffect(() => {
    setCards(adminCards);
  }, []);

  return (
    <div className="admin_cards_container">
      <h2>Panneau d'administration</h2>
      <div className="admin_cards_content">
        {cards.map((e, i) => (
          <Link
            to={e.link}
            key={i}
            className="admin_card_link"
            style={{
              backgroundColor:
                i % 2 === 0 ? "rgb(49, 51, 58)" : "rgba(76, 80, 85, 0.3)",
              color: i % 2 === 0 ? "white" : "black",
            }}
          >
            <div>{e.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
