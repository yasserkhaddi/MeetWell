import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../../Styles/admin/FetchedAppointment.css";
import { useNavigate } from "react-router-dom";
import {
  fetchUser,
  fetchAppointments,
  deleteAppoint,
} from "../../../Redux/Admin/action";
import NavBar from "../AdminNavBar/NavBar";
import { Trash2, House } from "lucide-react";
import AppointSearchBar from "./AppointSearchBar";
import { SquareArrowUp } from "lucide-react";
import { toast, Slide } from "react-toastify";

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

export default function FetchedAppointment() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(0);
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    dispatch(fetchUser()).then((r) => {
      setUsers(r.payload?.users || []);
    });

    dispatch(fetchAppointments()).then((r) => {
      setAppointments(r.payload.appointments);
      setFilteredAppointments(r.payload.appointments);
    });
  }, [dispatch, appointments]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter((appointment) => {
      if (searchOption === 1) return appointment._id.includes(searchTerm);
      if (searchOption === 2)
        return appointment.phoneNumber.includes(searchTerm);
      if (searchOption === 3) return appointment.date.includes(searchTerm);
      if (searchOption === 4) {
        const user = users.find((user) => user._id === appointment.userId);
        const fullName = user ? `${user.prenom} ${user.nom}`.toLowerCase() : "";
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          appointment.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.prenom.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    });

    setFilteredAppointments(filtered);
  }, [searchTerm, searchOption, appointments, users]);

  const handleNav = () => {
    nav("/admin/home");
  };

  const handleShowDescription = (description) => {
    const descriptionText = description
      ? description
      : "Aucune description disponible";
    setSelectedDescription(descriptionText);
  };

  const closePopup = () => {
    setSelectedDescription(null);
  };

  const handlDelete = (id) => {
    dispatch(deleteAppoint(id)).then((r) => {
      if (r.type === "admin/deleteAppoint/fulfilled") {
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

  return (
    <>
      <div>
        <NavBar />
        <div className="admin_fetchAppoint_content">
          <div className="admin_fetchAppoint_title">
            <button
              onClick={handleNav}
              className="admin_fetchUser_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
            <h2>Liste des rendez-vous :</h2>
          </div>

          {/* Search Bar Component */}
          <AppointSearchBar
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
              {filteredAppointments?.length > 0 ? (
                filteredAppointments.map((e, i) => {
                  const user = users?.length
                    ? users.find((user) => user._id === e.userId)
                    : null;

                  const fullName =
                    user?.prenom && user?.nom
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
                            onClick={() => handlDelete(e._id)}
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
