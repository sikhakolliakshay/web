import React, { useState, useEffect } from 'react';
import { HomeOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, message, Select } from 'antd'; // Import Select for language switcher
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './UserPage.css';
import logo1 from '../images/logo_sokasoko.png';

const { Option } = Select;

function UserPage() {
  const [activeLink, setActiveLink] = useState('/home');
  const [userData, setUserData] = useState(null);
  const { t, i18n } = useTranslation(); // Use the i18n object from react-i18next
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      navigate('/');
    } else {
      navigate('/users');
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          message.error('Failed to fetch user data');
        });
    }
  }, [userId]);

  const handleLinkClick = (path) => {
    if (path === '/home') {
      localStorage.removeItem('userId');
    }
    setActiveLink(path);
  };

  const changeLanguage = (value) => {
    i18n.changeLanguage(value); // Change language
  };

  return (
    <div className="user-page-container">
      <header>
        <nav>
          <img src={logo1} className="logo_1" alt="SokaSoko_logo" />
          <h1 className="brand">SokaSoko Soccer</h1>
          <ul>
            <li>
              <Link
                to="/home"
                className={activeLink === '/home' ? 'active' : ''}
                onClick={() => handleLinkClick('/home')}
              >
                <Avatar icon={<HomeOutlined />} className="icon" /> {t('home')}
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={activeLink === '/search' ? 'active' : ''}
                onClick={() => handleLinkClick('/search')}
              >
                <Avatar icon={<SearchOutlined />} className="icon" /> {t('search')}
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: '/account',
                  state: { user: { id: userId } },
                }}
                className={activeLink === '/account' ? 'active' : ''}
                onClick={() => handleLinkClick('/account')}
              >
                <Avatar icon={<UserOutlined />} className="icon" /> {t('my_account')}
              </Link>
            </li>
          </ul>
          <Select
            className="language-switcher1"
            defaultValue={i18n.language}
            onChange={changeLanguage}
          >
            <Option value="en">EN</Option>
            <Option value="sw">SW</Option>
          </Select>
        </nav>
      </header>
      <main>
        <section>
          <h2>{t('welcome_text')}</h2>
          {userData ? (
            <div>
              <p>
                <strong>{t('name')}:</strong> {userData.firstName} {userData.lastName}
              </p>
              <p>
                <strong>{t('account_number')}:</strong> {userData.accountNumber}
              </p>
              <p>
                <strong>{t('phone')}:</strong> {userData.phone}
              </p>
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
