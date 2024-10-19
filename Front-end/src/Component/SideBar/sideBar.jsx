import React from "react";
import { Home, Settings, User, Info, LogOut } from "lucide-react";
import "../../Styles/sideBar.css";
import Cookies from "js-cookie";

export default function SideBar() {
  const sidebarItems = [
    { icon: <Home />, text: "Home", link: "/home" },
    { icon: <User />, text: "Profile", link: "/profile" },
    { icon: <Settings />, text: "Settings", link: "/settings" },
    { icon: <Info />, text: "Plus d'information", link: "/about" },
  ];

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("client_info");
  };
  return (
    <div className="sidebar">
      {sidebarItems.map((item, index) => (
        <a href={item.link} className="sidebar-item" key={index}>
          <div className="icon">{item.icon}</div>
          <span className="text">{item.text}</span>
        </a>
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
