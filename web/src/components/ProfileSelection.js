// src/components/ProfileSelection.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ProfileSelection.css"; // Import the CSS file

function ProfileSelection() {
  const navigate = useNavigate();
   const { t } = useTranslation();

  return (
    <div className="profile-selection-container">
      <h1>{t("select_profile")}</h1>
      <div className="profile-buttons">
        <button className="profile-button" onClick={() => navigate("/signup/player")}>
          {t("player_profile")}
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/coach")}>
          {t("coach_profile")}
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/guardian")}>
          {t("guardian_profile")}
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/academy")}>
          {t("academy_profile")}
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/vendor")}>
          {t("vendor_profile")}
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/referee")}>
          {t("referee_profile")}
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/agent")}>
          {t("agent_profile")}
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/sponsor")}>
          {t("sponsor_profile")}
        </button>
      </div>
    </div>
  );
}

export default ProfileSelection;
