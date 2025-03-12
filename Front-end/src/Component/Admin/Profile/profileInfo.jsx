import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { Lock, LockOpen, House, SquareChevronLeft } from "lucide-react";
import NavBar from "../AdminNavBar/NavBar";
import { adminAddPhone, editUser } from "../../../Redux/Admin/action";
import "../../../Styles/admin/profilInfo.css";

export default function ProfileInfo() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const existingUser = !!cookie.get("access_token");
  const userCookies = cookie.get("client_info");
  let userInfo;

  if (!existingUser) {
    nav("/");
  }

  try {
    userInfo = userCookies ? JSON.parse(userCookies) : null;
  } catch (err) {
    console.error("Error parsing user cookies:", err);
    userInfo = null;
  }

  useEffect(() => {
    if (existingUser && userInfo) {
    } else {
      nav("/");
    }
  }, [existingUser, userInfo]);

  const [currentUser, setCurrentUser] = useState(userInfo || {});
  const [PhoneNumber, setPhoneNumber] = useState(currentUser.PhoneNumber || "");

  const [isFieldDisabled, setIsFieldDisabled] = useState({
    nom: true,
    prenom: true,
    email: true,
    dateDeNaissance: true,
    PhoneNumber: true,
  });

  const handleChange = (e) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    }
  };

  const toggleFieldDisabled = (fieldName) => {
    setIsFieldDisabled((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      currentUser.nom === "" ||
      currentUser.prenom === "" ||
      currentUser.email === "" ||
      currentUser.dateDeNaissance === ""
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
      const formData = {
        _id: currentUser._id,
        nom: currentUser.nom,
        prenom: currentUser.prenom,
        email: currentUser.email,
        dateDeNaissance: currentUser.dateDeNaissance,
        isAdmin: currentUser.isAdmin,
        PhoneNumber: PhoneNumber,
      };
      dispatch(editUser({ id: userInfo._id, formData: formData })).then(
        (res) => {
          if (res.type === "admin/editUser/fulfilled") {
            toast.success("Modification réussie", {
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
            const userUpdated = res.meta.arg.formData;
            setCurrentUser(userUpdated);
            cookie.set("client_info", JSON.stringify(userUpdated));
          }
        }
      );
    }
  };

  const addPhone = (e) => {
    e.preventDefault();
    if (PhoneNumber === "") {
      toast.error("Remplissez le champ!", {
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
      dispatch(
        adminAddPhone({ id: userInfo._id, PhoneNumber: PhoneNumber })
      ).then((r) => {
        if (r.type === "admin/addPhone/fulfilled") {
          toast.success("Modification réussie", {
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
          const userPhoneUpdate = r.meta.arg.PhoneNumber;
          setCurrentUser({ ...currentUser, PhoneNumber: userPhoneUpdate });
          cookie.set(
            "client_info",
            JSON.stringify({ ...currentUser, PhoneNumber: userPhoneUpdate })
          );
        }
      });
    }
  };

  const handleNav = () => {
    nav("/admin/profile");
  };
  const handlenavHome = () => {
    nav("/admin/home");
  };

  return (
    <>
      <div className="admin_info_perso_container">
        <NavBar />
        <div className="admin_info_perso_content">
          <div className="appoint_deleted_title">
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
          </div>
          <div className="admin_info_perso">
            <span className="admin_info_perso_title_span">
              Mettre à jour vos informations
            </span>
          </div>
          {/* ------------------------------ */}
          <div className="admin_info_perso_formul_data">
            <form
              className="admin_info_perso_formulaire"
              onSubmit={handleSubmit}
            >
              {["nom", "prenom", "email", "dateDeNaissance"].map((field) => (
                <div className="admin_info_perso_formul_total" key={field}>
                  <div className="admin_info_perso_formulaire_one">
                    <label className="admin_info_perso_formulaire_label_edit">
                      {field === "prenom"
                        ? "Prénom"
                        : field === "email"
                        ? "E-mail"
                        : field === "dateDeNaissance"
                        ? "Date de naissance"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                      :
                    </label>
                    <input
                      type={
                        field === "dateDeNaissance"
                          ? "date"
                          : field === "email"
                          ? "email"
                          : "text"
                      }
                      value={currentUser[field]}
                      name={field}
                      onChange={handleChange}
                      className="admin_info_perso_formulaire_input_edit"
                      disabled={isFieldDisabled[field]}
                    />
                  </div>
                  <div className="admin_info_perso_formulaire_two">
                    {isFieldDisabled[field] ? (
                      <Lock
                        color="rgb(190, 192, 168)"
                        onClick={() => toggleFieldDisabled(field)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <LockOpen
                        color="rgb(190, 192, 168)"
                        onClick={() => toggleFieldDisabled(field)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="admin_info_perso_formulaire_button_edit"
              >
                Enregistrer
              </button>
            </form>
            <hr />
            <span className="admin_info_perso_phone_title">
              Ajouter ou modifiée votre numéro de téléphone !
            </span>
            <div className="admin_info_perso_phone_number_section">
              <div className="admin_info_perso_split_phone">
                <div className="admin_info_perso_first_div_phone">
                  <label className="admin_info_perso_phone_label">
                    Numéro De Téléphone:
                  </label>
                  <input
                    type="tel"
                    value={PhoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    name="phoneNumber"
                    className="admin_info_perso_input_edit_phone"
                    min={0}
                    pattern="^0[1-9]([.-]?[0-9]{2}){4}$"
                    maxLength={13}
                    title="Le numéro de téléphone doit être valide, par exemple : 06 12 34 56 78"
                    disabled={isFieldDisabled.PhoneNumber}
                  />
                </div>
                <div className="admin_info_perso_second_div_phone">
                  {isFieldDisabled.PhoneNumber ? (
                    <Lock
                      color="rgb(190, 192, 168)"
                      onClick={() => toggleFieldDisabled("PhoneNumber")}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <LockOpen
                      color="rgb(190, 192, 168)"
                      onClick={() => toggleFieldDisabled("PhoneNumber")}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>
              <div className="admin_info_perso_edit_phone_button_div">
                <button
                  className="admin_info_perso_edit_phone_button"
                  onClick={addPhone}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
