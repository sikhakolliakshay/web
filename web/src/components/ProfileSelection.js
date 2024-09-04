// src/components/ProfileSelection.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSelection.css"; // Import the CSS file

function ProfileSelection() {
  const navigate = useNavigate();

  return (
    <div className="profile-selection-container">
      <h1>Select Your Profile</h1>
      <div className="profile-buttons">
        <button className="profile-button" onClick={() => navigate("/signup/player")}>
          Player Profile
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/coach")}>
          Coach Profile
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/guardian")}>
          Guardian Profile
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/academy")}>
          Academy Profile
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/vendor")}>
          Vendor Profile
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/referee")}>
          Referee Profile
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/agent")}>
          Agent Profile
        </button>
        <button className="profile-button" onClick={() => navigate("/signup/sponsor")}>
          Sponsor Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileSelection;
