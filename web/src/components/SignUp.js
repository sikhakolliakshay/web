import React from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';


function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>Sign Up</h1>
        <button 
          className="signup-button" 
          onClick={() => navigate("/signup/profiles")}
        >
          Continue to Profile Selection
        </button>
      </div>
      <div className="signup-right"></div>
    </div>
  );
}

export default SignUp;
