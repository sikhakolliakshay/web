//completed
import React, { useState, useEffect } from 'react';
import regionsData from '../../GeoLocation/Region.json';
import districtsData from '../../GeoLocation/District.json';
import wardsData from '../../GeoLocation/Wards.json';
import './AcademyProfile.css';
import axios from 'axios';  // Import axios for HTTP requests
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function AcademyProfile() {
  const [formData, setFormData] = useState({
    academyName: '',
    academyRegistration: '',
    academyBio: '',
    academyStartDate: '',
    contactPersonFirstName: '',
    contactPersonLastName: '',
    phone: '',
    dob: '',  // Added Date of Birth
    password: '',
    confirmPassword: '',
    tafoca: '',
    region: '',
    district: '',
    ward: '',
    street: '',
    email: '',
    contactNumber: '',
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    type: 'ACADEMY',  // Added to specify the user type
  });

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();
  const { t } =  useTranslation();

  useEffect(() => {
    setRegions(regionsData.features.map(region => region.properties.region));
  }, []);

  useEffect(() => {
    setDistricts(districtsData.features.map(district => district.properties.District));
  }, []);

  useEffect(() => {
    setWards(wardsData.features.map(ward => ward.properties.Ward));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Ensure passwords match before submitting
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/users`, formData);
      
      if (response.status === 201) {
        navigate('/Users'); // Redirect to user page on success
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error.response.data);
    }
  };

  return (
    <div className="academy-profile-container">
      <div className="academy-profile-header">
        {t("academy_profile_information")}
      </div>
      <form className="academy-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mandatory">{t('academy_name')}</label>
          <input type="text" name="academyName" value={formData.academyName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('academy_registration_number')}</label>
          <input type="text" name="academyRegistration" value={formData.academyRegistration} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('academy_bio')}</label>
          <textarea name="academyBio" value={formData.academyBio} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('academy_start_date')}</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('contact_person_first_name')}</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('contact_person_last_name')}</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      
        <div className="form-group">
          <label className="mandatory">{t('phone_number')}</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('password')}</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('confirm_password')}</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">{t('tafoca_membership')}</label>
          <select name="tafoca" value={formData.tafoca} onChange={handleChange} required>
            <option value="">{t('select_tafoca_membership')}</option>
            <option value="YES">{t('yes')}</option>
            <option value="NO">{t('no')}</option>
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">{t('region')}</label>
          <select name="region" value={formData.region} onChange={handleChange} required>
            <option value="">{t('select_region')}</option>
            {regions.map(region => <option key={region} value={region}>{region}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">{t('district')}</label>
          <select name="district" value={formData.district} onChange={handleChange} required>
            <option value="">{t('select_district')}</option>
            {districts.map(district => <option key={district} value={district}>{district}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">{t('ward')}</label>
          <select name="ward" value={formData.ward} onChange={handleChange} required>
            <option value="">{t('select_ward')}</option>
            {wards.map(ward => <option key={ward} value={ward}>{ward}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>{t('street')}</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t('email')}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t('contact_number')}</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t('facebook')}</label>
          <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t('youtube')}</label>
          <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t('instagram')}</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t('twitter')}</label>
          <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t('linkedIn')}</label>
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">{t('submit')}</button>
      </form>
    </div>
  );
}

export default AcademyProfile;
