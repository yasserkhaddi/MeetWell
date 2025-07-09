import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "../AdminNavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { House, SquareArrowUp, SquareChevronLeft } from "lucide-react";
import { fetchExpiredDaysOff } from "../../../Redux/Admin/action";
import ExpiredDaysOffSearchBar from "./expiredDaysOffSearchBar";

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

export default function ExpiredDaysOff() {
  const [expiredDaysOff, setExpiredDaysOff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(0);
  const [filterdDaysOff, setFilteredDaysOff] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (!searchTerm) {
      setFilteredDaysOff(expiredDaysOff);
      return;
    }

    const filtered = expiredDaysOff.filter((item) => {
      const value = searchTerm.toLowerCase();

      if (searchOption === 1) return item._id.toLowerCase().includes(value);
      if (searchOption === 3) return item.date?.toLowerCase().includes(value);
      if (searchOption === 4) {
        return item.description?.toLowerCase().includes(value);
      }

      return true;
    });

    setFilteredDaysOff(filtered);
  }, [searchTerm, searchOption, expiredDaysOff]);

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
    dispatch(fetchExpiredDaysOff()).then((r) => {
      if (r.type === "admin/fetchExpiredDaysOff/fulfilled") {
        setExpiredDaysOff(r.payload.expiredDaysOff);
      }
    });
  }, [expiredDaysOff, dispatch]);

  return (
    <>
      <div className="expired_days_off_container">
        <NavBar />
        <div
          className="appoint_deleted_title"
          style={{ "margin-top": "150px" }}
        >
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
        <div className="expired_days_off_content">
          <h2
            style={{
              textAlign: "center",
              fontWeight: "400",
              marginBottom: "50px",
            }}
          >
            Les jours de congé archivés
          </h2>
          <ExpiredDaysOffSearchBar
            setSearchTerm={setSearchTerm}
            setSearchOption={setSearchOption}
          />
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Enregistré en</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filterdDaysOff.length > 0 ? (
                  filterdDaysOff.map((e, i) => (
                    <tr key={i}>
                      <td data="Id ">{e._id}</td>
                      <td data="Date ">{e.date}</td>
                      <td data="Enregistré en ">{e.timeSaved}</td>
                      <td data="Description ">
                        <button
                          className="description-button"
                          onClick={() => handleShowDescription(e.description)}
                        >
                          Voir Description
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="appoint_false">
                      Aucun conjés expirés trouvé
                    </td>
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
