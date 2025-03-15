import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../AdminNavBar/NavBar";
import { clearTakenTimes } from "../../../Redux/Appointments/slice";
import { fetchTakenTime } from "../../../Redux/Appointments/actions";
import { adminAddAppoint, fetchDisableDate } from "../../../Redux/Admin/action";
import { useNavigate } from "react-router-dom";
import { House } from "lucide-react";
import { toast, Slide } from "react-toastify";
import "../../../Styles/admin/addAppoint.css";

export default function AdminAddAppoint() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    phoneNumber: "",
    date: "",
    description: "",
    time: "",
  });
  const [daysOff, setDaysOff] = useState([]);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const { takenTimes } = useSelector((state) => state.appointment);
  const times = takenTimes?.times || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!formData.date) {
      return;
    }
    dispatch(clearTakenTimes());
    dispatch(fetchTakenTime(formData.date));
  }, [formData.date, dispatch]);

  useEffect(() => {
    dispatch(fetchDisableDate()).then((r) => {
      if (r.type === "admin/fetch-disable-date/fulfilled") {
        setDaysOff(r.payload.days);
      }
    });
  }, [dispatch]);

  const isDateDisabled = (date) => {
    return daysOff.some((d) => d.date === date);
  };

  const getDisabledDateDescription = (date) => {
    const found = daysOff.find((d) => d.date === date);
    return found ? found.description : "";
  };

  const handleNav = () => {
    nav("/admin/home");
  };

  const availableTimes = [
    "10:00 -> 10:30",
    "10:30 -> 11:00",
    "11:00 -> 11:30",
    "11:30 -> 12:00",
    "12:00 -> 12:30",
    "12:30 -> 13:00",
    "13:00 -> 13:30",
    "13:30 -> 14:00",
    "14:00 -> 14:30",
    "14:30 -> 15:00",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        formData.phoneNumber === "" ||
        formData.date === "" ||
        formData.time === "" ||
        formData.nom === "" ||
        formData.prenom === ""
      ) {
        toast.error("Remplissez tous les champs!", {
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
      } else {
        dispatch(adminAddAppoint(formData)).then((r) => {
          if (r.type === "admin/addAppoint/fulfilled") {
            toast.success("Le rendez-vous a été enregistré avec succès", {
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
            setFormData({
              nom: "",
              prenom: "",
              phoneNumber: "",
              description: "",
              date: "",
              time: "",
            });
          } else if (r.type === "admin/addAppoint/rejected") {
            toast.error(r.payload, {
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
            setFormData({
              nom: "",
              prenom: "",
              phoneNumber: "",
              description: "",
              date: "",
              time: "",
            });
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="admin_add_appoint_container">
        <NavBar />
        <div className="admin_add_appoint_content">
          <div className="admin_add_appoint_title">
            <button
              onClick={handleNav}
              className="expired_appointments_title_button"
            >
              <House size={40} strokeWidth={1} />
            </button>
            <h2>Ajouter un rendez-vous pour un utilisateur :</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin_add_appoint_form">
            <div className="admin_add_appoint_form_left">
              <div className="admin_add_appoint_div">
                <label>Prénom:</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>
              <div className="admin_add_appoint_div">
                <label>Nom:</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>
              <div className="admin_add_appoint_div">
                <label>Date:</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    if (isDateDisabled(selectedDate)) {
                      toast.info(
                        `Cette date est indisponible dù : ${getDisabledDateDescription(
                          selectedDate
                        )}`,
                        {
                          theme: "dark",
                          transition: Slide,
                        }
                      );
                      return;
                    }
                    setFormData({ ...formData, date: selectedDate });
                  }}
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  disabled={isDateDisabled(formData.date)}
                />

                {isDateDisabled(formData.date) && (
                  <div className="disabled-tooltip">
                    {getDisabledDateDescription(formData.date)}
                  </div>
                )}
              </div>
              <div className="admin_add_appoint_div">
                <label>Temps:</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option>Veuillez sélectionner votre horaire</option>
                  {availableTimes.map((e) => {
                    const isDisabled =
                      times && times.some((t) => t.trim() === e.trim());

                    return (
                      <option
                        key={e}
                        value={e}
                        disabled={isDisabled}
                        className={isDisabled ? "disabled-option" : ""}
                      >
                        {e} {isDisabled && "\u00A0\u00A0\u00A0(déjà réservé)"}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="admin_add_appoint_div">
                <label>Nr De Téléphone:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  pattern="^0[1-9]([.-]?[0-9]{2}){4}$"
                  maxLength={13}
                  title="Le numéro de téléphone doit être valide, par exemple : 06 12 34 56 78"
                />
              </div>
              <div className="admin_add_appoint_div">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="admin_add_appoint_form_right">
              <button
                type="submit"
                className="admin_add_appoint_form_right_button"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
