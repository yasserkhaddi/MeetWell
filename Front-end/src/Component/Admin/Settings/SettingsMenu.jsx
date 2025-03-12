import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { House } from "lucide-react";
import NavBar from "../AdminNavBar/NavBar";

export default function SettingsMenu() {
  const [cards, setCards] = useState([]);

  const adminCards = [
    { name: "Ajuster les jours de congé", link: "/admin/setting/days-off" },
    // {
    //   name: "Signaler un rendez-vous",
    //   link: "/admin/setting/report",
    // },
  ];

  useEffect(() => {
    setCards(adminCards);
  }, []);

  const nav = useNavigate();
  const handleNav = () => {
    nav("/admin/home");
  };

  return (
    <div className="admin_cards_container">
      <h2>Section Paramètres</h2>
      <NavBar />
      <div className="appoint_deleted_title">
        <button
          onClick={handleNav}
          className="expired_appointments_title_button"
        >
          <House size={40} strokeWidth={1} />
        </button>
      </div>
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
