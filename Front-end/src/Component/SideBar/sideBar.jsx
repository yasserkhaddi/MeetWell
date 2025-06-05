import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, User, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import "../../Styles/Users/sideBar/sideBar.css";
import "../../Styles/Users/sideBar/sideBar_mobile.css";

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
    if (userInfo?.isAdmin) {
      setSidebarItems([
        { icon: <Home />, text: "Accueil", link: "/home" },
        { icon: <User />, text: "Profil", link: "/profile" },
        {
          icon: <Shield />,
          text: "Mode administrateur",
          link: "/admin/home",
          style: { color: "green", fontWeight: "bold" },
        },
        {
          icon: <LogOut />,
          text: "Déconnecter",
          link: "/#",
          className: "logout_class",
        },
      ]);
    } else {
      setSidebarItems([
        {
          icon: <Home />,
          text: "Accueil",
          link: "/home",
          className: "sidebar-item",
        },
        {
          icon: <User />,
          text: "Profil",
          link: "/profile",
          className: "sidebar-item",
        },
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
        <Link to={item.link} className={item.className} key={index}>
          <div className="icon">{item.icon}</div>
          <span className="text">{item.text}</span>
        </Link>
      ))}

      <div className="logout_class">
        <div className="icon" onClick={logout}>
          <LogOut />
        </div>
        <span className="text">Déconnecter</span>
      </div>

      <button onClick={logout} className="logout_button">
        <div className="icon">
          <LogOut />
        </div>
        <span className="text">Déconnecter</span>
      </button>
    </div>
  );
}
