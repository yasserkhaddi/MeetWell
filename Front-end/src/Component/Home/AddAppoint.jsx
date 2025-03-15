import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAppoint, fetchTakenTime } from "../../Redux/Appointments/actions";
import { fetchDisableDate } from "../../Redux/Admin/action";
import { clearTakenTimes } from "../../Redux/Appointments/slice";
import { CirclePlus, SquareChevronUp } from "lucide-react";
import "../../Styles/addappoint.css";
import { toast, Slide } from "react-toastify";

export default function AddAppoint({ userInfo }) {
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({
    userId: userInfo?._id || "",
    phoneNumber: userInfo?.PhoneNumber || "",
    date: "",
    description: "",
    time: "",
  });
  const [daysOff, setDaysOff] = useState([]);

  const dispatch = useDispatch();
  const { takenTimes, loading } = useSelector((state) => state.appointment);
  const times = takenTimes?.times || [];

  useEffect(() => {
    if (!formData.date) return;
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

  const toggleModel = () => {
    setShowModel(!showModel);
    setFormData({
      userId: userInfo._id,
      phoneNumber: userInfo.PhoneNumber || "",
      description: "",
      date: "",
      time: "",
    });
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
    if (!formData.phoneNumber || !formData.date || !formData.time) {
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
      return;
    }

    const dataToSubmit = { ...formData, userId: userInfo._id };
    dispatch(addAppoint(dataToSubmit)).then((r) => {
      if (r.type === "appoint/add/fulfilled") {
        toast.success("Votre rendez-vous a été pris avec succès", {
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
        toggleModel();
      } else if (r.type === "appoint/add/rejected") {
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
      }
    });
  };

  return (
    <div>
      <button className="add_button" onClick={toggleModel}>
        <CirclePlus strokeWidth={3} />
      </button>

      {showModel && (
        <div className="modal_overlay">
          <div className="modal_content">
            <div className="modal_content_header">
              <h2 className="modal_header_title">
                Ajouter un nouveau rendez-vous
              </h2>
              <button onClick={toggleModel} className="close_button">
                <SquareChevronUp size={40} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form_grp">
                Date:
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
                  className="nbr_input"
                  min={new Date().toISOString().split("T")[0]}
                  disabled={isDateDisabled(formData.date)}
                />
                {/* Tooltip for the disabled date */}
                {isDateDisabled(formData.date) && (
                  <div className="disabled-tooltip">
                    {getDisabledDateDescription(formData.date)}
                  </div>
                )}
                Temps:
                <select
                  className="select_form"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  name="time"
                  disabled={!formData.date}
                >
                  <option>Veuillez sélectionner votre horaire</option>
                  {availableTimes.map((e) => {
                    const isDisabled = times && times.includes(e.trim());
                    return (
                      <option key={e} value={e} disabled={isDisabled}>
                        {e} {isDisabled && "(déjà réservé)"}
                      </option>
                    );
                  })}
                </select>
                Nr De Téléphone:
                <input
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="nbr_input"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  name="phoneNumber"
                  pattern="^0[1-9]([.-]?[0-9]{2}){4}$"
                  maxLength={13}
                  title="Le numéro de téléphone doit être valide, par exemple : 06 12 34 56 78"
                />
                Description:
                <textarea
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="nbr_textarea"
                  name="description"
                  rows={5}
                  placeholder="Décrivez votre problème."
                />
                <div className="confirm_div">
                  <button type="submit" className="confirm">
                    Enregistrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
