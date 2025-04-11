import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "../AdminNavBar/NavBar";
import "../../../Styles/admin/fetchedUserAppointment.css";
import { Trash2, SquareChevronLeft, House } from "lucide-react";
import { DescriptionPopup } from "../appointments/FetchedAppointment";
import { deleteAppoint } from "../../../Redux/Admin/action";
import { toast, Slide } from "react-toastify";

export default function FetchedUserAppointment() {
  const location = useLocation();
  const { appointments, user } = location.state || { appointments: [] };
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [appointmentList, setAppointmentList] = useState(appointments);

  const handleNav = () => {
    nav("/admin/users");
  };

  const handlenavHome = () => {
    nav("/admin/home");
  };

  const handleDescriptionClick = (description) => {
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
    setAppointmentList((prevAppointments) =>
      prevAppointments.filter((appoint) => appoint._id !== id)
    );
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="admin_user_appointments">
          <div className="admin_user_appointment_title">
            <button
              onClick={handleNav}
              className="admin_fetchUser_title_button"
            >
              <SquareChevronLeft size={40} strokeWidth={1} />
            </button>
            <button
              onClick={handlenavHome}
              className="admin_fetchUser_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
            <h2>
              Liste des rendez-vous de {user.nom} {user.prenom} :
            </h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Numéro de téléphone</th>
                <th>Date</th>
                <th>Créneau réservé</th>
                <th>Temps enregistré</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.length > 0 ? (
                appointmentList.map((e, i) => (
                  <tr key={i}>
                    <td data="Id ">{e._id} </td>
                    <td data="Téléphone "> {e.phoneNumber} </td>
                    <td data="Date "> {e.date} </td>
                    <td data="Créneau réservé "> {e.time} </td>
                    <td data="Temps enregistré "> {e.timeSaved} </td>
                    <td data="Description ">
                      <button
                        className="description-button"
                        onClick={() => handleDescriptionClick(e.description)}
                      >
                        Voir Description
                      </button>
                    </td>
                    <td data="Actions ">
                      {" "}
                      <div className="afutd">
                        <button
                          onClick={() => handlDelete(e._id)}
                          className="afutb"
                        >
                          <Trash2 />
                        </button>
                      </div>{" "}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="appoint_false">
                    L'utilisateur n'a aucun rendez-vous
                  </td>
                  <td className="td_disabled"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Display the DescriptionPopup if a description is selected */}
      {selectedDescription && (
        <DescriptionPopup
          description={selectedDescription}
          closePopup={closePopup}
        />
      )}
    </>
  );
}
