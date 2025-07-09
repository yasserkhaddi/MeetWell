import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addDisabledDate,
  addDisabledDateRange,
} from "../../../Redux/Admin/action";
import { CirclePlus, SquareChevronUp } from "lucide-react";
import { toast, Slide } from "react-toastify";
import "../../../Styles/Users/home/addAppoint/addappoint.css";

export default function AddDayOff({ daysOff, setDaysOff }) {
  const [showModel, setShowModel] = useState(false);
  const [mode, setMode] = useState("single");

  const [DayOff, setDayOff] = useState({
    date: "",
    description: "",
  });

  const [DayOffRange, setDayOffRange] = useState({
    startDate: "",
    endDate: "",
    description: "",
  });

  const dispatch = useDispatch();

  const toggleModel = () => {
    setShowModel(!showModel);
    setDayOff({ date: "", description: "" });
    setDayOffRange({ startDate: "", endDate: "", description: "" });
    setMode("single");
  };

  const handleChange = (e) => {
    setDayOff({ ...DayOff, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "single") {
      if (DayOff.date === "" || DayOff.description === "") {
        toast.error("Remplissez tous les champs !", {
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
        } else {
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
    } else {
      const { startDate, endDate, description } = DayOffRange;
      if (!startDate || !endDate || !description) {

        toast.error("Remplissez tous les champs !", {
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

      dispatch(
        addDisabledDateRange({
          startDate,
          endDate,
          description,
        })
      ).then((r) => {
       
        if (r.type === "admin/addDisabledDateRange/fulfilled") {
          setDaysOff([...daysOff]);
          toast.success("Les jours de congé ont été ajoutés avec succès", {
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
        } else {
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
    }
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
                  <div className="mode_toggle">
                    <label>
                      <input
                        type="radio"
                        name="mode"
                        value="single"
                        checked={mode === "single"}
                        onChange={() => setMode("single")}
                      />
                      Un seul jour
                    </label>
                    ||
                    <label>
                      <input
                        type="radio"
                        name="mode"
                        value="range"
                        checked={mode === "range"}
                        onChange={() => setMode("range")}
                      />
                      Plusieurs jours
                    </label>
                  </div>

                  {mode === "single" ? (
                    <>
                      Date :
                      <input
                        type="date"
                        value={DayOff.date}
                        onChange={handleChange}
                        name="date"
                        className="nbr_input"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      Description :
                      <textarea
                        type="text"
                        value={DayOff.description}
                        onChange={handleChange}
                        className="nbr_textarea"
                        name="description"
                        rows={5}
                        placeholder="Décrivez votre raison pour ce jour de congé"
                      />
                    </>
                  ) : (
                    <>
                      Du :
                      <input
                        type="date"
                        value={DayOffRange.startDate}
                        onChange={(e) =>
                          setDayOffRange({
                            ...DayOffRange,
                            startDate: e.target.value,
                          })
                        }
                        className="nbr_input"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      Au :
                      <input
                        type="date"
                        value={DayOffRange.endDate}
                        onChange={(e) =>
                          setDayOffRange({
                            ...DayOffRange,
                            endDate: e.target.value,
                          })
                        }
                        className="nbr_input"
                        min={
                          DayOffRange.startDate ||
                          new Date().toISOString().split("T")[0]
                        }
                      />
                      Description :
                      <textarea
                        type="text"
                        value={DayOffRange.description}
                        onChange={(e) =>
                          setDayOffRange({
                            ...DayOffRange,
                            description: e.target.value,
                          })
                        }
                        className="nbr_textarea"
                        rows={5}
                        placeholder="Décrivez la raison de cette période de congé"
                      />
                    </>
                  )}

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
