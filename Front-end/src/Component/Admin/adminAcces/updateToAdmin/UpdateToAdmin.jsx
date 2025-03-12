import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import NavBar from "../../AdminNavBar/NavBar";
import {
  fetchAllUsers,
  upgradToAdmin,
  downgradeToUser,
} from "../../../../Redux/Admin/action";
import "../../../../Styles/admin/fetchedUser.css";
import { House, ShieldCheck } from "lucide-react";
import SearchBar from "./searchBar";
import { toast, Slide } from "react-toastify";
import { Button } from "antd";

export default function UpdateToUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Check for user info from cookies
  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (e) {
    console.error("Error parsing user cookies:", e);
    userInfo = null;
  }

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUsers()).then((r) => {
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
        if (searchOption === 5) {
          if (searchTerm === "admin") return user.isAdmin;
          if (searchTerm === "normal") return !user.isAdmin;
        }
        return false;
      });
    }

    setFilteredUsers(filtered);
  }, [searchTerm, searchOption, users]);

  const handleNav = () => {
    nav("/admin/home");
  };

  const handlePopUp = (user) => {
    setSelectedUser(user); // Set selected user before opening the popup
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null); // Reset the selected user
  };

  const handleConfirm = (id) => {
    dispatch(upgradToAdmin(id)).then((r) => {
      if (r.type === "admin/upgradeToAdmin/fulfilled") {
        // Update users state after upgrading to admin
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, isAdmin: true } : user
        );
        setUsers(updatedUsers); // Update the users state

        // Only access selectedUser if it's not null
        if (selectedUser) {
          toast.success(
            `L'utilisateur ${selectedUser.nom} est devenu administrateur !`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Slide,
            }
          );
        }
      }
      closePopup(); // Close the popup only after upgrade action is confirmed
    });
  };

  const handleToUser = (id, user) => {
    dispatch(downgradeToUser(id)).then((r) => {
      if (r.type === "admin/downgradeToUser/fulfilled") {
        // Update users state after downgrading to user
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, isAdmin: false } : user
        );
        setUsers(updatedUsers); // Immediately update the users state

        // Directly show toast message using the user details
        toast.success(
          `L'administrateur ${user.nom} est redevenu un utilisateur normal !`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          }
        );
      }
    });
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

          <SearchBar
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
                <th>Crée le</th>
                <th>Type d'utilisateur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((e, i) => {
                  const isCurrentUser = e._id === userInfo?._id; // Check if it's the logged-in user
                  return (
                    <tr key={i}>
                      <td>
                        {e.nom} {e.prenom}
                      </td>
                      <td>{e.email}</td>
                      <td>{e.dateDeNaissance}</td>
                      <td>
                        {e.PhoneNumber
                          ? e.PhoneNumber
                          : "Aucun numéro de téléphone"}
                      </td>
                      <td>{e.created_at}</td>
                      <td>{e.isAdmin ? "Admin" : "Normale"}</td>
                      <td>
                        <div className="afutd">
                          {e.isAdmin ? (
                            <Button
                              disabled={isCurrentUser} // Disable for the logged-in user
                              onClick={() => handleToUser(e._id, e)}
                            >
                              Révoquer l'administrateur
                            </Button>
                          ) : (
                            <button
                              disabled={isCurrentUser} // Disable for the logged-in user
                              onClick={() => handlePopUp(e)}
                              className="afutb"
                            >
                              <ShieldCheck />
                            </button>
                          )}
                        </div>
                        {isPopupOpen && selectedUser && (
                          <div className="edit_user_overlay">
                            <div className="edit_user_content">
                              <h2>Confirmer l'action</h2>
                              <p>
                                Voulez-vous vraiment mettre {selectedUser.nom}{" "}
                                {selectedUser.prenom} comme administrateur ?
                              </p>
                              <div className="to_center">
                                <button
                                  onClick={() =>
                                    handleConfirm(selectedUser._id)
                                  }
                                  className="confirm_button"
                                >
                                  Confirmer
                                </button>
                                <button
                                  onClick={closePopup}
                                  className="cancel_button"
                                >
                                  Annuler
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
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
