import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import EditProfile from './components/EditProfile'; // Import EditProfile component
import EditContactInfo from './components/EditContactInfo'; // Import EditContactInfo component


function App() {
  return (
    <Router>
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
        <Route path="/files" element={<FilePage />} /> {/* Add route for FilePage */}
        <Route path="/cvs" element={<CvsPage />} /> {/* Add route for FilePage */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* Route for EditProfile */}
        <Route path="edit-contact-info" element={<EditContactInfo />} /> {/* Route for EditContactInfo */}
        {/* Add routes for adding and editing CVs */}
        {/* <Route path="/cvs/new" element={<NewCvPage />} />
        <Route path="/cvs/:id/edit" element={<EditCvPage />} /> */}

        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
