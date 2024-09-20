import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './SignUp.css';

function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>{t('signUp')}</h1>
        <button className="signup-button" onClick={() => navigate("/signup/profiles")}>
          {t('continue_profile_selection')}
        </button>
      </div>
      <div className="signup-right"></div>
    </div>
  );
}

export default SignUp;
