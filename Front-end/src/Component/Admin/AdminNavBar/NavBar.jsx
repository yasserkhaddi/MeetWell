import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { User, Settings, ShieldCheck  , LogOut } from "lucide-react";
import "../../../Styles/admin/adminNavBar.css";
import "../../../Styles/admin/adminNavBar_mobile.css";

export default function NavBar() {
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;
  const nav = useNavigate();

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
    if (userInfo.isAdmin === false) {
      console.error("Access denied");
      nav("/");
    }
  }, [existingUser, userInfo]);

  const handleLogout = () => {
    cookie.remove("access_token");
    cookie.remove("client_info");
    nav("/");
    window.location.reload();
  };

  const handleProfile = () => {
    nav("/admin/profile");
  };
  const handleSettings = () => {
    nav("/admin/Settings");
  };
  const handleAdmin = () => {
    nav("/admin/access");
  };

  return (
    <>
      <div className="admin_nav">
        <div className="admin_nav_list" onClick={handleProfile}>
          Profil
        </div>
        <div className="admin_nav_list_mobile" onClick={handleProfile}>
          <User />
        </div>
        <div className="admin_nav_list" onClick={handleSettings}>
          Paramètres
        </div>
        <div className="admin_nav_list_mobile" onClick={handleSettings}>
          <Settings />
        </div>
        <div className="admin_nav_list" onClick={handleAdmin}>
          Administrateurs
        </div>
        <div className="admin_nav_list_mobile" onClick={handleAdmin}>
          <ShieldCheck   />
        </div>
        <div className="admin_nav_list" onClick={handleLogout}>
          Déconnexion
        </div>
        <div className="admin_nav_list_mobile" onClick={handleLogout}>
          <LogOut />
        </div>
      </div>
    </>
  );
}
