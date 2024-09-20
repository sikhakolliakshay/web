import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProfileSelection from './components/ProfileSelection';
import PlayerProfile from './components/profiles/PlayerProfile';
import CoachProfile from './components/profiles/CoachProfile';
import GuardianProfile from './components/profiles/GuardianProfile';
import AcademyProfile from './components/profiles/AcademyProfile';
import VendorProfile from './components/profiles/VendorProfile';
import RefereeProfile from './components/profiles/RefereeProfile';
import AgentProfile from './components/profiles/AgentProfile';
import SponsorProfile from './components/profiles/SponsorProfile';
import UserPage from './components/UserPage';
import SearchPage from './components/SearchPage';
import AccountPage from './components/AccountPage';
import FilePage from './components/FilePage'; 
import CvsPage from './components/CvsPage';
import EditProfile from './components/EditProfile';
import EditContactInfo from './components/EditContactInfo';
import './i18n'; //Import i18n configuration

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/profiles" element={<ProfileSelection />} />
        <Route path="/signup/player" element={<PlayerProfile />} />
        <Route path="/signup/coach" element={<CoachProfile />} />
        <Route path="/signup/guardian" element={<GuardianProfile />} />
        <Route path="/signup/academy" element={<AcademyProfile />} />
        <Route path="/signup/vendor" element={<VendorProfile />} />
        <Route path="/signup/referee" element={<RefereeProfile />} />
        <Route path="/signup/agent" element={<AgentProfile />} />
        <Route path="/signup/sponsor" element={<SponsorProfile />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/files" element={<FilePage />} />
        <Route path="/cvs" element={<CvsPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit-contact-info" element={<EditContactInfo />} />

        {/* Fallback route */}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
