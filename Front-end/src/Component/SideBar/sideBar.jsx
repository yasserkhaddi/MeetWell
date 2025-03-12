import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Settings, User, Info, LogOut, Shield } from "lucide-react";
import "../../Styles/sideBar.css";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

export default function SideBar() {
  const [sidebarItems, setSidebarItems] = useState([]);
  const nav = useNavigate();
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (e) {
    console.error("Error parsing user cookies:", e);
    userInfo = null;
  }

  useEffect(() => {
    if (existingUser && userInfo) {
    } else {
      nav("/");
    }
  }, [existingUser, userInfo]);

  useEffect(() => {
    if (userInfo.isAdmin) {
      setSidebarItems([
        { icon: <Home />, text: "Accueil", link: "/home" },
        { icon: <User />, text: "Profil", link: "/profile" },
        {
          icon: <Shield />,
          text: "Mode administrateur",
          link: "/admin/home",
          style: { color: "green", fontWeight: "bold" },
        },
        // { icon: <Settings />, text: "Paramètres", link: "/settings" },
        // { icon: <Info />, text: "Plus d'information", link: "/about" },
      ]);
    } else {
      setSidebarItems([
        { icon: <Home />, text: "Accueil", link: "/home" },
        { icon: <User />, text: "Profil", link: "/profile" },
        // { icon: <Shield />, text: "Mode administrateur", link: "/admin/home" },
        // { icon: <Settings />, text: "Paramètres", link: "/settings" },
        // { icon: <Info />, text: "Plus d'information", link: "/about" },
      ]);
    }
  }, [existingUser, nav]);

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
