import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo_sokasoko.png'; // Ensure the path is correct
import './Home.css'

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="overlay"></div>
      <h1>Soka Soko</h1>
      <p>Welcome to Soka Soko<br />The Soccer</p>
      <div className="logo-container">
        <img src={logo} alt="Soka Soko Logo" className="logo" />
      </div>
      <div className="btn-container">
        <button className="btn-signin" onClick={() => navigate('/signin')}>Sign In</button>
        <button className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
