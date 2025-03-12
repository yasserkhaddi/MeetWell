import React, { useState, useEffect } from "react";
import NavBar from "../AdminNavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { House, Trash2, SquareArrowUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import AppointDeletedByUserSearchBar from "./AppointDeleteByUserSearchBar";
import {
  fetchDeletedAppointmentsUser,
  fetchUser,
  deleteAppointPerUser,
} from "../../../Redux/Admin/action";
import "../../../Styles/admin/appointDeletedUser.css";

export const DescriptionPopup = ({ description, closePopup }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={closePopup} className="popup-close">
          <SquareArrowUp />
        </button>
        <h3>Description</h3>
        <textarea readOnly value={description} className="popup-textarea" />
      </div>
    </div>
  );
};

export default function AppointDeletedByUser() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(0);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await dispatch(fetchUser());
        setUsers(usersResponse.payload.users);

        dispatch(fetchDeletedAppointmentsUser()).then((r) => {
          setAppointments(r.payload?.deletedAppointments || []);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch, appointments]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter((appoint) => {
      if (searchOption === 1) return appoint._id.includes(searchTerm);
      if (searchOption === 2) return appoint.phoneNumber.includes(searchTerm);
      if (searchOption === 3) return appoint.date.includes(searchTerm);
      if (searchOption === 4) {
        const user = users.find((user) => user._id === appoint.userId);
        const fullName = user
          ? `${user.prenom || ""} ${user.nom || ""}`.toLowerCase()
          : "";

        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          (appoint.nom &&
            appoint.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (appoint.prenom &&
            appoint.prenom.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      return true;
    });

    setFilteredAppointments(filtered);
  }, [searchTerm, searchOption, appointments, users]);

  const handleShowDescription = (description) => {
    const descriptionText = description
      ? description
      : "Aucune description disponible";
    setSelectedDescription(descriptionText);
  };

  const closePopup = () => {
    setSelectedDescription(null);
  };

  const handelDelete = (id) => {
    dispatch(deleteAppointPerUser(id)).then((r) => {
      if (r.type === "admin/deleteAppointPerUser/fulfilled") {
        toast.success("rendez-vous supprimez avec success", {
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
    });
  };

  const handleNav = () => {
    nav("/admin/home");
  };
  return (
    <>
      <div className="appoint_del_user_container">
        <NavBar />
        <div className="appoint_del_user_content">
          <div className="appoint_del_user_title">
            <button
              onClick={handleNav}
              className="expired_appointments_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
            <h2>Liste des rendez-vous supprimés par l'utilisateur :</h2>
          </div>
          <AppointDeletedByUserSearchBar
            setSearchTerm={setSearchTerm}
            setSearchOption={setSearchOption}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom et Prénom</th>
                <th>Numéro de téléphone</th>
                <th>Date</th>
                <th>Créneau réservé</th>
                <th>Temps enregistré</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((e, i) => {
                  const user = users.find((user) => user._id === e.userId);
                  const fullName = user
                    ? `${user.prenom} ${user.nom}`
                    : e.prenom && e.nom
                    ? `${e.prenom} ${e.nom}`
                    : "Utilisateur inconnu";

                  return (
                    <tr key={i}>
                      <td> {e._id} </td>
                      <td> {fullName} </td>
                      <td> {e.phoneNumber} </td>
                      <td> {e.date} </td>
                      <td> {e.time} </td>
                      <td> {e.timeSaved} </td>
                      <td>
                        <button
                          className="description-button"
                          onClick={() => handleShowDescription(e.description)}
                        >
                          Voir Description
                        </button>
                      </td>
                      <td>
                        <div className="afutd">
                          <button
                            onClick={() => handelDelete(e._id)}
                            className="afutb"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="appoint_false">
                    Aucun rendez-vous trouvé
                  </td>
                  <td className="td_disabled"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedDescription && (
        <DescriptionPopup
          description={selectedDescription}
          closePopup={closePopup}
        />
      )}
    </>
  );
}
