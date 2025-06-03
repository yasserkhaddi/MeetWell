import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Users/auth/popupConfirm.css";

export default function PopupConfirm() {
  const nav = useNavigate();
  const [counter, setCounter] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval);
          nav("/");
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nav]);

  return (
    <div className="popup_confirm_container">
      <div className="popup_confirm_content">
        <h2>
          Code envoyé avec succès
          <span>
            <Check color="#00ff59" />
          </span>
        </h2>
        <h2>Merci de cliquer sur le lien envoyé à votre compte !</h2>
        <p>
          Redirection dans {counter} seconde{counter !== 1 ? "s" : ""}...
        </p>
      </div>
    </div>
  );
}
