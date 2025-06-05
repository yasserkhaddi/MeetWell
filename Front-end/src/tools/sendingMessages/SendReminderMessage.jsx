// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { sendMessage } from "../../Redux/Appointments/actions";

// export default function SendReminderMessage() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(sendMessage()).then((r) => {
//       if (r.type === "appointments/sendEmailReminder/fulfilled") {
//         console.log("reminder sent succ");
//       }
//     });
//   }, [dispatch]);
// }
