import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDisabledDate,
  removeDisabledDate,
  fetchDisableDate,
} from "../../../Redux/Admin/action";
import NavBar from "../AdminNavBar/NavBar";
import { House, SquareChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Trash2, SquareArrowUp } from "lucide-react";
import { toast, Slide } from "react-toastify";
import "../../../Styles/admin/daysOff.css";
import AddDayOff from "./AddDayOff";

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

export default function DaysOff() {
  const [daysOff, setDaysOff] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleNav = () => {
    nav("/admin/settings");
  };
  const handlenavHome = () => {
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

  useEffect(() => {
    dispatch(fetchDisableDate()).then((r) => {
      if (r.type === "admin/fetch-disable-date/fulfilled") {
        setDaysOff(r.payload.days);
      }
    });
  }, [daysOff, dispatch]);

  const handlDelete = (date) => {
    dispatch(removeDisabledDate({ date: date })).then((r) => {
      if (r.type === "admin/removeDisabledDate/fulfilled") {
        setDaysOff((prevDays) => prevDays.filter((day) => day.date !== date));
        toast.success("Conjés supprimez avec success", {
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
      <div className="admin_days_off_container">
        <NavBar />
        <div className="appoint_deleted_title">
          <button onClick={handleNav} className="admin_fetchUser_title_button">
            <SquareChevronLeft size={40} strokeWidth={1} />
          </button>
          <button
            onClick={handlenavHome}
            className="admin_fetchUser_title_button"
          >
            <House size={40} strokeWidth={1} />
          </button>
        </div>
        <div className="admin_days_off_content">
          <h2>Les jours de congé</h2>
          <AddDayOff daysOff={daysOff} setDaysOff={setDaysOff} />
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Enregistré en</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {daysOff.length > 0 ? (
                  daysOff.map((e, i) => (
                    <tr key={i}>
                      <td>{e._id}</td>
                      <td>{e.date}</td>
                      <td>{e.timeSaved}</td>
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
                            onClick={() => handlDelete(e.date)}
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
                    <td colSpan="4" className="appoint_false">
                      Aucun conjés trouvé
                    </td>
                    <td className="td_disabled"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
