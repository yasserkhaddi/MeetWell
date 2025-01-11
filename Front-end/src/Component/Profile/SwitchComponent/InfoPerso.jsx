import React, { useEffect, useState } from "react";
import "../../../Styles/infoPerso.css";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { editUser, addPhoneNumber } from "../../../Redux/Users/actions";
import { useSelector, useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { Lock, LockOpen } from "lucide-react";

export default function InfoPerso() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.users);

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
        PhoneNumber: PhoneNumber,
      };
      dispatch(editUser({ id: userInfo._id, formData: formData })).then(
        (res) => {
          if (res.type === "user/edit/fulfilled") {
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
        addPhoneNumber({ id: userInfo._id, PhoneNumber: PhoneNumber })
      ).then((r) => {
        if (r.type === "User/addPhoneNumber/fulfilled") {
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

  return (
    <>
      <div className="infoperso_container">
        <div className="infoperso_content">
          <div className="title_header">
            <span className="title_span_edit">
              Mettre à jour vos informations
            </span>
          </div>
          <div className="formul_data">
            <form className="formulaire" onSubmit={handleSubmit}>
              {["nom", "prenom", "email", "dateDeNaissance"].map((field) => (
                <div className="formul_total" key={field}>
                  <div className="formulaire_one">
                    <label className="formulaire_label_edit">
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
                      type={field === "email" ? "email" : "text"}
                      value={currentUser[field]}
                      name={field}
                      onChange={handleChange}
                      className="formulaire_input_edit"
                      disabled={isFieldDisabled[field]}
                    />
                  </div>
                  <div className="formulaire_two">
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

              <button type="submit" className="formulaire_button_edit">
                Enregistrer
              </button>
            </form>
            <hr />
            <span className="phone_title">
              Ajouter ou modifiée votre numéro de téléphone !
            </span>
            <div className="phone_number_section">
              <div className="split_phone">
                <div className="first_div_phone">
                  <label className="phone_label">Numéro De Téléphone:</label>
                  <input
                    type="number"
                    value={PhoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    name="phoneNumber"
                    className="input_edit_phone"
                    min={0}
                    disabled={isFieldDisabled.PhoneNumber}
                  />
                </div>
                <div className="second_div_phone">
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
              <div className="edit_phone_button_div">
                <button className="edit_phone_button" onClick={addPhone}>
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
