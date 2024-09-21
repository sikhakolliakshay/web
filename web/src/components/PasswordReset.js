import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PasswordReset.css';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      // If no userId is found in localStorage, redirect to the login page
      navigate('/');
      return;
    }
    setUserId(storedUserId);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/reset/${userId}`, 
        { 
          oldPassword, 
          newPassword 
        }
      );
      
      if (response.status === 204 || response.status === 201) {
        setSuccess('Password changed successfully!');
        setError('');
      
        // Show success message for 2 seconds, then navigate to the home page
        setTimeout(() => {
          navigate('/'); // Redirect to the home page after 2 seconds
        }, 2000);
      }
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error updating password. Please try again.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="password-reset">
      <h2>Reset Password</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Change Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;
