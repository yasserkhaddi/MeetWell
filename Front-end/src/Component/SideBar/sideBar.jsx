import React from "react";
import { Link } from "react-router-dom";
import { Home, Settings, User, Info, LogOut } from "lucide-react";
import "../../Styles/sideBar.css";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

export default function SideBar() {
  const sidebarItems = [
    { icon: <Home />, text: "Accueil", link: "/home" },
    { icon: <User />, text: "Profil", link: "/profile" },
    { icon: <Settings />, text: "Paramètres", link: "/settings" },
    { icon: <Info />, text: "Plus d'information", link: "/about" },
  ];
  const nav = useNavigate();

  const logout = () => {
    cookie.remove("access_token");
    cookie.remove("client_info");
    nav("/");
    window.location.reload();
  };
  return (
    <div className="sidebar">
      {sidebarItems.map((item, index) => (
        <Link to={item.link} className="sidebar-item" key={index}>
          <div className="icon">{item.icon}</div>
          <span className="text">{item.text}</span>
        </Link>
      ))}
      <button onClick={logout} className="logout_button">
        <div className="icon">
          <LogOut />
        </div>
        <span className="text">Déconnecter</span>
      </button>
    </div>
  );
}
