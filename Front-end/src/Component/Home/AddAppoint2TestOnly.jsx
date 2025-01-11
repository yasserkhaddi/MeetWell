// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addAppoint, fetchTakenTime } from "../../Redux/Appointments/actions";
// import { CirclePlus, SquareChevronUp } from "lucide-react";
// import "../../Styles/addappoint.css";
// import { toast, Slide } from "react-toastify";

// export default function AddAppoint2({ userInfo }) {
//   const [showModel, setShowModel] = useState(false);
//   const [formData, setFormData] = useState({
//     userId: userInfo?._id || "",
//     phoneNumber: "",
//     day: "",
//     time: "",
//   });

//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const { takenTimes, loading } = useSelector((state) => state.appointment);
//   const times = takenTimes.times;

//   useEffect(() => {
//     if (formData.day) {
//       dispatch(fetchTakenTime(formData.day));
//     }
//   }, [formData.day, dispatch]);

//   const toggleModel = () => {
//     setShowModel(!showModel);
//     setFormData({
//       userId: userInfo._id,
//       phoneNumber: "",
//       day: "",
//       time: "",
//     });
//   };

//   const time = [
//     "10:00 -> 10.30",
//     "10:30 -> 11:00",
//     "11:00 -> 11:30",
//     "11:30 -> 12:00",
//     "12:00 -> 12:30",
//     "12:30 -> 13:00",
//     "13:00 -> 13:30",
//     "13:30 -> 14:00",
//     "14:00 -> 14:30",
//     "14:30 -> 15:00",
//   ];
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       if (
//         formData.day === "" ||
//         formData.phoneNumber === "" ||
//         formData.time === ""
//       ) {
//         toast.error("Remplissez tous les champs!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           transition: Slide,
//         });
//       } else {
//         const dataToSubmit = {
//           ...formData,
//           userId: userInfo._id,
//         };

//         dispatch(addAppoint(dataToSubmit)).then((r) => {
//           console.log(r);
//           if (r.type === "appoint/add/fulfilled") {
//             toast.success("Votre rendez-vous a été pris avec succès", {
//               position: "top-right",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//               transition: Slide,
//             });
//             toggleModel();
//             setFormData({
//               userId: userInfo._id,
//               phoneNumber: "",
//               day: "",
//               time: "",
//             });
//           } else if (r.type === "appoint/add/rejected") {
//             toast.error(r.payload, {
//               position: "top-right",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//               transition: Slide,
//             });
//             toggleModel();
//             setFormData({
//               userId: userInfo._id,
//               phoneNumber: "",
//               day: "",
//               time: "",
//             });
//           }
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div>
//         <button className="add_button" onClick={toggleModel}>
//           <CirclePlus strokeWidth={3} />
//         </button>
//         {showModel && (
//           <div className="modal_overlay">
//             <div className="modal_content">
//               <div className="modal_content_header">
//                 <h2 className="modal_header_title">
//                   Ajouter un nouveux rendez-vous{" "}
//                 </h2>
//                 <button onClick={toggleModel} className="close_button">
//                   <SquareChevronUp size={40} />{" "}
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="form_grp">
//                   Jour:
//                   <select
//                     className="select_form"
//                     value={formData.day}
//                     onChange={handleChange}
//                     name="day"
//                   >
//                     <option>
//                       Veuillez sélectionner votre jour pour cette semaine{" "}
//                     </option>
//                     <option>Lundi</option>
//                     <option>Mercredi</option>
//                     <option>Vendredi</option>
//                   </select>
//                   Temps:
//                   <select
//                     className="select_form"
//                     value={formData.time}
//                     onChange={handleChange}
//                     name="time"
//                     disabled={!formData.day}
//                   >
//                     <option>Veuillez sélectionner votre horaire</option>
//                     {time.map((e) => {
//                       const isDisabled =
//                         times && times.some((t) => t.trim() === e.trim());
//                       return (
//                         <option
//                           key={e}
//                           value={e}
//                           disabled={isDisabled}
//                           className={isDisabled ? "disabled-option" : ""}
//                         >
//                           {e} {isDisabled && "\u00A0\u00A0\u00A0(déjà réservé)"}
//                         </option>
//                       );
//                     })}
//                   </select>
//                   Nr De Télephone:
//                   <input
//                     type="number"
//                     placeholder="06 12 34 56 78"
//                     className="nbr_input"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     name="phoneNumber"
//                   />
//                   <div className="confirm_div">
//                     <button type="submit" className="confirm">
//                       Enregistrer
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
