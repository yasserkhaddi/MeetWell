import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/sideBar";
import ProfileBar from "./ProfileBar";
import "../../Styles/profile.css";
import cookie from "js-cookie";
import InfoPerso from "./SwitchComponent/InfoPerso";
import Password from "./SwitchComponent/passwordUpdate";
import logo from "../../tools/logo/logo.png";
import Clock from "../Clock/Clock";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "./SwitchComponent/DeleteAccount";

export default function Profile() {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [selectedOption, setSelectedOption] = useState(1);

  useEffect(() => {
    document.title = "Profile";

    const existingUser = !!cookie.get("access_token");
    if (!existingUser) {
      nav("/");
    }

    const fetchUserInfo = () => {
      const userCookies = cookie.get("client_info");
      try {
        const parsedUserInfo = userCookies ? JSON.parse(userCookies) : null;
        setUserInfo(parsedUserInfo);
      } catch (e) {
        console.error("Error parsing user cookies:", e);
        setUserInfo(null);
      }
    };

    fetchUserInfo();

    const intervalId = setInterval(fetchUserInfo, 1000);
    return () => clearInterval(intervalId);
  }, [nav]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 1:
        return <InfoPerso />;
      case 2:
        return <Password />;
      case 3:
        return <DeleteAccount />;
      default:
        return <InfoPerso />;
    }
  };

  return (
    <div className="profile_container">
      <SideBar />
      <div className="profile_bar_second">
        <ProfileBar
          selectedOption={selectedOption}
          onOptionClick={handleOptionClick}
        />
      </div>
      <div className="profile_content">
        <div className="profileheader">
          <div className="profileheader_left">
            <img src={logo} alt="Logo" className="header_logo" />
            <div className="welcome">
              {userInfo ? (
                <span className="welcome_text">
                  Bonjour {userInfo.nom} {userInfo.prenom}
                </span>
              ) : (
                <span className="welcome_text">Loading...</span>
              )}
            </div>
          </div>
          <div className="profileheader_right">
            <Clock />
          </div>
        </div>
        <hr />
        <div className="profile_component">{renderComponent()}</div>
      </div>
    </div>
  );
}
