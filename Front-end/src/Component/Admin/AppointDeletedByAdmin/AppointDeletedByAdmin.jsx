import React, { useState, useEffect } from "react";
import NavBar from "../AdminNavBar/NavBar";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../../Styles/admin/appointDeleted.css";
import {
  fetchDeletedAppointments,
  fetchUser,
  deleteAppointPerAdmin,
} from "../../../Redux/Admin/action";
import DeletedAppointSearchBar from "./DeletedAppointSearchBar";
import { Trash2, SquareArrowUp } from "lucide-react";
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

export default function AppointDeletedByAdmin() {
  const [delAppoint, setDelAppoint] = useState([]);
  const [users, setUsers] = useState([]);
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

        dispatch(fetchDeletedAppointments()).then((r) => {
          setDelAppoint(r.payload?.deletedAppointments || []);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAppointments(delAppoint);
      return;
    }

    const filtered = delAppoint.filter((delappointment) => {
      if (searchOption === 1) return delappointment._id.includes(searchTerm);
      if (searchOption === 2)
        return delappointment.phoneNumber.includes(searchTerm);
      if (searchOption === 3) return delappointment.date.includes(searchTerm);
      if (searchOption === 4) {
        const user = users.find((user) => user._id === delappointment.userId);
        const fullName = user
          ? `${user.prenom || ""} ${user.nom || ""}`.toLowerCase()
          : "";

        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          (delappointment.nom &&
            delappointment.nom
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (delappointment.prenom &&
            delappointment.prenom
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
        );
      }
      return true;
    });

    setFilteredAppointments(filtered);
  }, [searchTerm, searchOption, delAppoint, users]);

  const handleNav = () => {
    nav("/admin/home");
  };

  const handleShowDescription = (description) => {
    const descriptionText = description
      ? description
      : "No description available";
    setSelectedDescription(descriptionText);
  };

  const closePopup = () => {
    setSelectedDescription(null);
  };

  const handelDelete = (id) => {
    dispatch(deleteAppointPerAdmin(id)).then((r) => {
      if (r.type === "admin/deleteAppointPerAdmin/fulfilled") {
        toast.dismiss();
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
        setDelAppoint((prev) => prev.filter((a) => a._id !== id));
        setFilteredAppointments((prev) => prev.filter((a) => a._id !== id));
      }
    });
  };

  return (
    <>
      <div className="appoint_deleted_container">
        <NavBar />
        <div className="appoint_deleted_content">
          <div className="appoint_deleted_title">
            <button
              onClick={handleNav}
              className="expired_appointments_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
            <h2>Liste des rendez-vous supprimés par l'administrateur :</h2>
          </div>
          <DeletedAppointSearchBar
            setSearchTerm={setSearchTerm}
            setSearchOption={setSearchOption}
          />
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
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
