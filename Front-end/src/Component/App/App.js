import React, { useEffect } from "react";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Registration from "../Authentification/Registration";
import Login from "../Authentification/Login";
import Home from "../Home/Home";
import Loading from "../Loading/Loading";
import Profile from "../Profile/Profile";
import AdminHome from "../Admin/Home";
import FetchedUsers from "../Admin/users/fetchedUsers";
import FetchedUserAppointment from "../Admin/users/FetchedUserAppointment";
import FetchedAppointment from "../Admin/appointments/FetchedAppointment";
import ExpiredAppointments from "../Admin/ExpiredAppointments/ExpiredAppointments";
import AppointDeletedByAdmin from "../Admin/AppointDeletedByAdmin/AppointDeletedByAdmin";
import AppointDeletedByUser from "../Admin/AppointDeletedByUser/AppointDeletedByUser";
import AdminAddAppoint from "../Admin/AddAppoint/AdminAddAppoint";
import ProfileMenu from "../Admin/Profile/ProfileMenu";
import ProfileInfo from "../Admin/Profile/profileInfo";
import ChangePassword from "../Admin/Profile/ChangePassword";
import DeleteAccount from "../Admin/Profile/DeleteAccount";
import SettingsMenu from "../Admin/Settings/SettingsMenu";
import DaysOff from "../Admin/Settings/DaysOff";
import AdminAccess from "../Admin/adminAcces/AdminAccess";
import AddUser from "../Admin/adminAcces/AddUser/AddUser";
import UpdateToUser from "../Admin/adminAcces/updateToAdmin/UpdateToAdmin";
import "../../Styles/app/app.css";
import ForgetPassword from "../Authentification/ForgetPassword";
import ResetPassword from "../Authentification/ResetPassword";

export default function App() {
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (e) {
    console.error("Error parsing user cookies:", e);
    userInfo = null;
  }

  const nav = useNavigate();

  useEffect(() => {
    if (
      !existingUser &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/forgot-password" &&
      window.location.pathname !== "/reset-password"
    ) {
      nav("/");
    }
    if (existingUser && !userInfo) {
      console.error("User cookie is invalid.");
      nav("/");
    }
    if (
      existingUser &&
      userInfo?.isAdmin &&
      ["/", "/signup", "/forgot-password", "/reset-password"].includes(
        window.location.pathname
      )
    ) {
      nav("/admin/home");
    }
  }, [existingUser, userInfo, nav]);

  return (
    <>
      <ToastContainer limit={1} draggable />
      <Routes>
        {/* Redirect Admin from Login, Signup, Home, Profile */}
        {!userInfo?.isAdmin && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </>
        )}

        {userInfo?.isAdmin && (
          <>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/users" element={<FetchedUsers />} />
            <Route
              path="/admin/users/appointments"
              element={<FetchedUserAppointment />}
            />
            <Route
              path="/admin/appointments"
              element={<FetchedAppointment />}
            />
            <Route
              path="/admin/expired-appointments"
              element={<ExpiredAppointments />}
            />
            <Route
              path="/admin/appointments-deleted"
              element={<AppointDeletedByAdmin />}
            />
            <Route
              path="/admin/appointments-deleted-by-user"
              element={<AppointDeletedByUser />}
            />
            <Route
              path="/admin/add/appointments"
              element={<AdminAddAppoint />}
            />
            <Route path="/admin/profile" element={<ProfileMenu />} />
            <Route path="/admin/profile/info" element={<ProfileInfo />} />
            <Route
              path="/admin/profile/password"
              element={<ChangePassword />}
            />
            <Route
              path="/admin/profile/delete_compte"
              element={<DeleteAccount />}
            />
            <Route path="/admin/settings" element={<SettingsMenu />} />
            <Route path="/admin/setting/days-off" element={<DaysOff />} />
            <Route path="/admin/access" element={<AdminAccess />} />
            <Route path="/admin/access/add/user" element={<AddUser />} />
            <Route path="/admin/access/add/admin" element={<UpdateToUser />} />
          </>
        )}
      </Routes>
    </>
  );
}
