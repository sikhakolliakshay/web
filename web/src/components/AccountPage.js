import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutOutlined, PlusOutlined, EditOutlined, FileOutlined } from '@ant-design/icons';
import { Avatar, message } from 'antd';
import axios from 'axios';
import './AccountPage.css';

function AccountPage() {
  const id = localStorage.getItem("userId");
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location?.state?.user || null);
  const [showAddOptions, setShowAddOptions] = useState(false); // State to show/hide add options

  useEffect(() => {
    if (!id) {
      // If userId is null, navigate to the "/" path
      navigate('/');
    } else if (!user) {
      fetchUserData(id);
    }
  }, [user, id, navigate]); // Include navigate in the dependency array

  const fetchUserData = async (userId) => {
    try {
      console.log('Fetching account data for user ID:', userId);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`);
      console.log('User account data:', response.data);
      setUser(response.data);
    } catch (error) {
      message.error('Failed to fetch user details');
      console.error('Error fetching user details:', error);
    }
  };

  const handleLogout = () => {
    message.info('Logging out...');
    localStorage.removeItem("userId");
    navigate('/');
  };

  const handleChangeProfileImage = () => {
    message.info('Change profile image feature coming soon!');
  };

  const handleAddNewItem = (item) => {
    setShowAddOptions(!showAddOptions);

    if (item === 'CV') {
      navigate('/cvs');
    } else if (item === 'Files') {
      navigate('/files');
    } else if (item === 'EditProfile') {
      navigate('/edit-profile');
    }
  };

  return (
    <div className="account-page">
      <div className="header">
        <div className="profile-image-container">
          <img
            src={user?.profileImage || 'profile-image-placeholder.png'}
            alt="Profile"
            className="profile-image"
          />
          <button
            className="change-profile-image-button"
            onClick={handleChangeProfileImage}
          >
            Change Profile Image
          </button>
        </div>
        <div className="logout-icon" onClick={handleLogout}>
          <LogoutOutlined />
        </div>
      </div>

      <div className="account-details">
        {user ? (
          <>
            <DetailItem label="Full Name" value={`${user.firstName} ${user.lastName}`} />
            <DetailItem label="Account Number" value={user.accountNumber} />
            <DetailItem label="Phone Number" value={user.phone} />
            <DetailItem label="Region" value={user.region} />
            <DetailItem label="District" value={user.district} />
            <DetailItem label="Ward" value={user.ward} />
            <DetailItem label="Type" value={user.type} />
            <DetailItem label="Date of Birth" value={user.dob} />
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      <div className="floating-button" onClick={() => {
        console.log('Toggling showAddOptions:', !showAddOptions);
        setShowAddOptions(!showAddOptions);
      }}>
        <PlusOutlined />
      </div>

      {showAddOptions && (
        <div className="add-options">
          <button className="add-option-button" onClick={() => handleAddNewItem('EditProfile')}>
            <EditOutlined /> Edit Profile
          </button>
          <button className="add-option-button" onClick={() => handleAddNewItem('CV')}>
            <FileOutlined /> CV
          </button>
          <button className="add-option-button" onClick={() => handleAddNewItem('Files')}>
            <FileOutlined /> Files
          </button>
        </div>
      )}
    </div>
  );
}

// Reusable component for displaying detail items
const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value || 'N/A'}</span>
  </div>
);

export default AccountPage;
