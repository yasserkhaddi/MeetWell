import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDisabledDate } from "../../../Redux/Admin/action";
import "../../../Styles/addappoint.css";
import { CirclePlus, SquareChevronUp } from "lucide-react";
import { toast, Slide } from "react-toastify";

export default function AddDayOff({ daysOff, setDaysOff }) {
  const [showModel, setShowModel] = useState(false);
  const [DayOff, setDayOff] = useState({
    date: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDayOff({ ...DayOff, [e.target.name]: e.target.value });
  };

  const toggleModel = () => {
    setShowModel(!showModel);
    setDayOff({
      date: "",
      description: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (DayOff.date === "" || DayOff.description === "") {
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

    dispatch(addDisabledDate(DayOff)).then((r) => {
      if (r.type === "admin/addDisabledDate/fulfilled") {
        setDaysOff([...daysOff, r.payload]);

        toast.success("Votre congé a été pris avec succès", {
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
      } else if (r.type === "admin/addDisabledDate/rejected") {
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

        toggleModel();
      }
    });
  };

  return (
    <>
      <div>
        <div className="add_new_day_off">
          <button className="add_button" onClick={toggleModel}>
            <CirclePlus strokeWidth={3} />
          </button>
        </div>
        {showModel && (
          <div className="modal_overlay">
            <div className="modal_content">
              <div className="modal_content_header">
                <h2 className="modal_header_title">Ajouter un nouveau congé</h2>
                <button onClick={toggleModel} className="close_button">
                  <SquareChevronUp size={40} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form_grp">
                  Date:
                  <input
                    type="date"
                    value={DayOff.date}
                    onChange={handleChange}
                    name="date"
                    className="nbr_input"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  Description:
                  <textarea
                    type="text"
                    value={DayOff.description}
                    onChange={handleChange}
                    className="nbr_textarea"
                    name="description"
                    rows={5}
                    placeholder="Décrivez votre maladie ou un autre problème."
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
    </>
  );
}
