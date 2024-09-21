import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, PlusOutlined, EditOutlined, FileOutlined } from '@ant-design/icons';
import { Avatar, message, Upload } from 'antd';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import './AccountPage.css';

function AccountPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!userId) {
      navigate('/');
      message.info('Please log in to access your account.');
    } else {
      fetchUserData(userId);
    }
  }, [userId, navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      message.error('Failed to fetch user details.');
      console.error('Error fetching user details:', error);
    }
  };

  const handleLogout = () => {
    message.info('Logging out...');
    localStorage.removeItem("userId");
    navigate('/');
  };

  const handleUploadProfileImage = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to base64
  
    reader.onload = async () => {
      const base64Data = reader.result; // base64 string
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/v1/users/${userId}/upload-profile-image`,
          { profileImage: base64Data }, // Send base64 string to the server
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: response.data.profileImage,
        }));
        message.success('Profile image uploaded successfully');
      } catch (error) {
        message.error('Failed to upload profile image');
        console.error('Error uploading profile image:', error); // Add error logging
      }
    };
  
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  };

  const handleToggleAddOptions = () => {
    setShowAddOptions(!showAddOptions);
  };

  const handleAddNewItem = (item) => {
    if (item === 'CV') {
      navigate('/cvs');
    } else if (item === 'Files') {
      navigate('/files');
    } else if (item === 'EditProfile') {
      navigate('/edit-profile');
    }
    else if (item === 'PasswordReset') {
      navigate('/Password');
    }
  };

  return (
    <div className="account-page">
      <div className="header">
        <h1 className="account-title">{t("account")}</h1>
        <div className="profile-image-container">
          <img
            src={user?.profileImage || 'profile-image-placeholder.png'}
            alt="Profile"
            className="profile-image"
          />
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={({ file }) => handleUploadProfileImage(file)}
            disabled={uploading}
          >
            <button className="change-profile-image-button">
              {uploading ? 'Uploading...' : t("change_profile_image") }
            </button>
          </Upload>
        </div>
        <div className="logout-icon" onClick={handleLogout}>
          <LogoutOutlined />
        </div>
      </div>

      <div className="account-details">
        {user ? (
          <>
            <DetailItem label={t("full_name")} value={`${user.firstName} ${user.lastName}`} />
            <DetailItem label={t("account_number")} value={user.accountNumber} />
            <DetailItem label={t("phone_number")} value={user.phone} />
            <DetailItem label={t("region")} value={user.region} />
            <DetailItem label={t("district")} value={user.district} />
            <DetailItem label={t("ward")} value={user.ward} />
            <DetailItem label={t("type")} value={user.type} />
            <DetailItem label={t("dtae_Of_birth")} value={user.dob} />
          </>
        ) : (
          <p>{t("loading_data")}</p>
        )}
      </div>

      {/* Floating button to add new items */}
      <div className="floating-button" onClick={handleToggleAddOptions}>
        <PlusOutlined />
      </div>

      {/* Add options menu that appears above the floating button */}
      {showAddOptions && (
        <div className="add-options above-button">
          <button className="add-option-button" onClick={() => handleAddNewItem('EditProfile')}>
            <EditOutlined /> {t("edit_profile")}
          </button>
          <button className="add-option-button" onClick={() => handleAddNewItem('CV')}>
            <FileOutlined /> {t("cv")}
          </button>
          <button className="add-option-button" onClick={() => handleAddNewItem('Files')}>
            <FileOutlined /> {t("files")}
          </button>
          <button className="add-option-button" onClick={() => handleAddNewItem('PasswordReset')}>
            <FileOutlined /> {t("PasswordReset")}
          </button>
        </div>
      )}
    </div>
  );
}

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value || 'N/A'}</span>
  </div>
);

export default AccountPage;
