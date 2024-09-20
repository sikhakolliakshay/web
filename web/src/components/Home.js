import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../images/logo_sokasoko.png';
import './Home.css';

function Home() {
  const { i18n, t } = useTranslation();
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/signin');
    }, 600);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`home-container ${isNavigating ? 'slide-out' : ''}`}>
      <div className="overlay"></div>
      <div className="logo-container">
        <img src={logo} alt="Soka Soko Logo" className="logo" />
      </div>
      <div className="btn-container">
        <button className="btn-signin" onClick={handleSignInClick}>
          {t('signIn')}
        </button>
        <button className="btn-signup" onClick={() => navigate('/signup')}>
          {t('signUp')}
        </button>
      </div>
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('sw')}>Swahili</button>
      </div>
    </div>
  );
}

export default Home;
