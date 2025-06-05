import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { emailVerification } from "../../Redux/Users/actions";
import { toast, Slide } from "react-toastify";
import "../../Styles/Users/auth/emailVerification.css";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const { loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (!token) {
      toast.error("Lien invalide ou expiré", {
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
      nav("/");
      return;
    }
    dispatch(emailVerification(token)).then((r) => {
      if (r.type === "User/emailVerification/fulfilled") {
        nav("/home");
        toast.success("Connexion réussie", {
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
  }, [token, nav, dispatch]);

  return (
    <>
      <div className="email_verification_container">
        {loading && (
          <div className="email_verification_content">
            <h2>Verification en cours ...</h2>
          </div>
        )}
      </div>
    </>
  );
}
