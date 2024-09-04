import React, { useState, useEffect } from 'react';
import { HomeOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link, useLocation, and useNavigate
import axios from 'axios';
import './UserPage.css';

function UserPage() {
  const [activeLink, setActiveLink] = useState('/home');
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      // If userId is null, navigate to the "/" path
      navigate('/');
    } else {
      // If userId is present, navigate to the "/users" path
      navigate('/users');
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (userId) {
      console.log('Fetching data for user ID:', userId);
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`)
        .then((response) => {
          console.log('User data:', response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          message.error('Failed to fetch user data');
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleLinkClick = (path) => {
    if (path === '/home') {
      localStorage.removeItem('userId'); // Remove userId from localStorage
    }
    setActiveLink(path);
  };

  return (
    <div className="user-page-container">
      <header>
        <nav>
          <ul>
            <li>
              <Link
                to="/home"
                className={activeLink === '/home' ? 'active' : ''}
                onClick={() => handleLinkClick('/home')}
              >
                <Avatar icon={<HomeOutlined />} className="icon" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={activeLink === '/search' ? 'active' : ''}
                onClick={() => handleLinkClick('/search')}
              >
                <Avatar icon={<SearchOutlined />} className="icon" /> Search
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: "/account",
                  state: { user: { id: userId } } // Pass the user ID to AccountPage
                }}
                className={activeLink === '/account' ? 'active' : ''}
                onClick={() => handleLinkClick('/account')}
              >
                <Avatar icon={<UserOutlined />} className="icon" /> My Account
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h1>Welcome to the User Page</h1>
          {userData ? (
            <div>
              <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
              <p><strong>Account Number:</strong> {userData.accountNumber}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              {/* Add more user-specific details here */}
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default UserPage;
