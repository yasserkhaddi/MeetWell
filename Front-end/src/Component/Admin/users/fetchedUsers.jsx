import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../AdminNavBar/NavBar";
import {
  fetchUser,
  fetchUserAppointment,
  deleteUser,
  editUserPassword,
} from "../../../Redux/Admin/action";
import "../../../Styles/admin/fetchedUser.css";
import { Pencil, Trash2, House, Lock } from "lucide-react";
import EditPopup from "./EditPopup";
import UserSearchBar from "./UserSearchBar";
import ChangePasswordPopup from "./ChangePasswordPopup";
import { toast, Slide } from "react-toastify";

export default function FetchedUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(0);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchUser()).then((r) => {
      setUsers(r.payload?.users || []);
      setFilteredUsers(r.payload?.users || []);
    });
  }, [dispatch]);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = users.filter((user) => {
        if (searchOption === 0) return true;
        if (searchOption === 1) {
          return `${user.nom} ${user.prenom}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        if (searchOption === 2)
          return user.email.toLowerCase().includes(searchTerm.toLowerCase());
        if (searchOption === 3)
          return user.dateDeNaissance.includes(searchTerm);
        if (searchOption === 4) return user.PhoneNumber?.includes(searchTerm);
        return false;
      });
    }

    setFilteredUsers(filtered);
  }, [searchTerm, searchOption, users]);

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  const handleNav = () => {
    nav("/admin/home");
  };

  const handleUser = (user) => {
    dispatch(fetchUserAppointment(user._id)).then((r) => {
      const appointments = r.payload.appointments;
      nav("/admin/users/appointments", {
        state: {
          appointments: appointments,
          user: user,
        },
      });
    });
  };

  const handlePopUp = (userInfo) => {
    setSelectedUser(userInfo);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id)).then(() => {
      toast.success("Ce compte a été supprimé avec succès", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
      setFilteredUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    });
  };

  const handlePassword = (user) => {
    setSelectedUserForPassword(user);
  };

  const closePasswordPopup = () => {
    setSelectedUserForPassword(null);
  };

  const changeUserPassword = (userId, newPassword) => {
    dispatch(editUserPassword({ id: userId, password: newPassword })).then(
      (r) => {
        if (r.type === "admin/editUserPassword/fulfilled") {
          toast.success("Votre mot de passe a été changé avec succès", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        }
      }
    );
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="admin_fetchUser_content">
          <div className="admin_fetchUser_title">
            <button
              onClick={handleNav}
              className="admin_fetchUser_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
            <h2>Liste d'utilisateurs :</h2>
          </div>

          <UserSearchBar
            setSearchTerm={setSearchTerm}
            setSearchOption={setSearchOption}
          />

          <table className="table">
            <thead>
              <tr>
                <th>Nom et Prénom</th>
                <th>E-mail</th>
                <th>Date de naissance</th>
                <th>Téléphone</th>
                <th>Mot de passe</th>
                <th>Crée le</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((e, i) => (
                  <tr key={i}>
                    <td
                      data="Nom et prénom "
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUser(e)}
                    >
                      {e.nom} {e.prenom}
                    </td>
                    <td
                      data="E-mail "
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUser(e)}
                    >
                      {e.email}
                    </td>
                    <td
                      data="Date de naissance "
                      onClick={() => handleUser(e)}
                      style={{ cursor: "pointer" }}
                    >
                      {e.dateDeNaissance}
                    </td>
                    <td
                      data="Téléphone "
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUser(e)}
                    >
                      {e.PhoneNumber
                        ? e.PhoneNumber
                        : "Aucun numéro de téléphone"}
                    </td>
                    <td data="Mot de passe ">
                      <button
                        onClick={() => handlePassword(e)}
                        className="afutb"
                      >
                        <Lock />
                      </button>
                    </td>

                    <td
                      data="Crée le "
                      onClick={() => handleUser(e)}
                      style={{ cursor: "pointer" }}
                    >
                      {e.created_at}
                    </td>

                    <td data="Actions ">
                      <div className="afutd">
                        <button
                          onClick={() => handlePopUp(e)}
                          className="afutb"
                        >
                          <Pencil />
                        </button>
                        {selectedUserForPassword && (
                          <ChangePasswordPopup
                            user={selectedUserForPassword}
                            closePopup={closePasswordPopup}
                            changePassword={changeUserPassword}
                          />
                        )}
                        {selectedUser?._id === e._id && (
                          <EditPopup
                            user={selectedUser}
                            closePopup={closePopup}
                            updateUser={handleUpdateUser}
                          />
                        )}

                        <button
                          onClick={() => handleDeleteUser(e._id)}
                          className="afutb"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="appoint_false">
                    Aucun utilisateur trouvé
                  </td>
                  <td className="td_disabled"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
