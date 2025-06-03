import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "../AdminNavBar/NavBar";
import "../../../Styles/admin/expiredAppointments.css";
import { useNavigate } from "react-router-dom";
import { House, Trash2, SquareArrowUp } from "lucide-react";
import ExpiredAppointmentSearchBar from "./ExpiredAppointmentSearchBar";
import {
  fetchExpiredAppointments,
  fetchUser,
  deleteAppointPer,
} from "../../../Redux/Admin/action";
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

export default function ExpiredAppointments() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(0);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await dispatch(fetchUser());
        const appointmentsResponse = await dispatch(fetchExpiredAppointments());

        setUsers(usersResponse.payload.users);
        setAppointments(appointmentsResponse.payload.expiredAppoint);
        setFilteredAppointments(appointmentsResponse.payload.expiredAppoint);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

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
        const fullName = user
          ? `${user.prenom || ""} ${user.nom || ""}`.toLowerCase()
          : "";

        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          (appointment.nom &&
            appointment.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (appointment.prenom &&
            appointment.prenom.toLowerCase().includes(searchTerm.toLowerCase()))
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handelDelete = (id) => {
    dispatch(deleteAppointPer(id)).then((r) => {
      if (r.type === "admin/deleteAppointPer/fulfilled") {
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
        setAppointments((prev) => prev.filter((a) => a._id !== id));
        setFilteredAppointments((prev) => prev.filter((a) => a._id !== id));
      }
    });
  };

  return (
    <>
      <div className="expired_appointments_container">
        <NavBar />
        <div className="expired_appointments_content">
          <div className="expired_appointments_title">
            <button
              onClick={handleNav}
              className="expired_appointments_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
            <h2>Liste des rendez-vous expirés :</h2>
          </div>
          <ExpiredAppointmentSearchBar
            setSearchTerm={setSearchTerm}
            setSearchOption={setSearchOption}
          />
        </div>
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
                    <td data="Id "> {e._id} </td>
                    <td data="Nom et Prénom "> {fullName} </td>
                    <td data="Numéro de téléphone "> {e.phoneNumber} </td>
                    <td data="Date "> {e.date} </td>
                    <td data="Créneau réservé "> {e.time} </td>
                    <td data="Temps enregistré "> {e.timeSaved} </td>
                    <td data="Description ">
                      <button
                        className="description-button"
                        onClick={() => handleShowDescription(e.description)}
                      >
                        Voir Description
                      </button>
                    </td>
                    <td data="Actions ">
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

      {selectedDescription && (
        <DescriptionPopup
          description={selectedDescription}
          closePopup={closePopup}
        />
      )}
    </>
  );
}
