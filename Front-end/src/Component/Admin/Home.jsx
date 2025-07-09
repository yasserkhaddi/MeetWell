import { useEffect } from "react";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./AdminNavBar/NavBar";
import Cards from "./Cards";
import { moveExpiredDaysOff } from "../../Redux/Admin/action";

export default function AdminHome() {
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;
  const nav = useNavigate();
  const dispatch = useDispatch();

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (e) {
    console.error("Error parsing user cookies:", e);
    userInfo = null;
  }

  const handleExpiredDaysOff = async () => {
    await dispatch(moveExpiredDaysOff());
  };

  useEffect(() => {
    handleExpiredDaysOff();
  }, []);

  useEffect(() => {
    document.title = "Admin panel";
    if (!existingUser && !userInfo) {
      nav("/");
    }
  }, [existingUser, userInfo]);

  useEffect(() => {
    if (userInfo.isAdmin === false) {
      console.error("Access denied");
      nav("/");
    }
  }, [existingUser, userInfo]);

  return (
    <>
      <div>
        <NavBar />
        <Cards />
      </div>
    </>
  );
}
