import { useDispatch, useSelector } from "react-redux";
import { sendVerificationLink } from "../../Redux/Users/actions";
import { toast, Slide } from "react-toastify";
import { useLocation } from "react-router-dom";
import "../../Styles/Users/auth/createVerificationEmail.css";

export default function CreateVerificationEmail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const email = location.state?.email;

  const { loading } = useSelector((state) => state.users);

  const handlSendingLink = () => {
    dispatch(sendVerificationLink(email)).then((r) => {
      if (r.type === "User/VerificationLink/fulfilled") {
        toast.success("Link sent succ", {
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
      <div className="create_verification_email_container">
        <div className="create_verification_email_content">
          <h3>Votre adresse e-mail n'est pas encore vérifiée.</h3>
          <h3>
            Vous ne pouvez pas accéder à votre profil sans vérifier votre
            adresse e-mail.
          </h3>

          <h3>Veuillez vérifier votre compte.</h3>

          <button
            className="send_verification_button"
            onClick={handlSendingLink}
          >
            Envoyer le lien de vérification
          </button>
        </div>
      </div>
    </>
  );
}
