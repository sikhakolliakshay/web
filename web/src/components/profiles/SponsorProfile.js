import React, { useState, useEffect } from 'react';
import regionsData from '../../GeoLocation/Region.json';
import districtsData from '../../GeoLocation/District.json';
import wardsData from '../../GeoLocation/Wards.json';
import './SponsorProfile.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function SponsorProfile() {
  const [sponsorType, setSponsorType] = useState('INDIVIDUAL');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
    nationality: '',
    gender: '',
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
    entityName: '',
    type:'SPONSOR',  // For entity type
  });
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setRegions(regionsData.features.map(region => region.properties.region));
    setDistricts(districtsData.features.map(district => district.properties.District));
    setWards(wardsData.features.map(ward => ward.properties.Ward));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/users`, formData);
      
      if (response.status === 201) {
        navigate('/Users'); // Redirect to user page on success
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="sponsor-profile-container">
      <div className='sponsor-profile-header'>
        {t("sponsor_profile_information")}
      </div>
      <form className="sponsor-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mandatory">{t("sponsor_type")}</label>
          <select name="sponsorType" value={sponsorType} onChange={e => setSponsorType(e.target.value)} required>
            <option value="INDIVIDUAL">{t("individual")}</option>
            <option value="ENTITY">{t("entity")}</option>
          </select>
        </div>

        {sponsorType === 'INDIVIDUAL' && (
          <>
            <h2>{t("individual_sponsor_information")}</h2>
            <div className="form-group">
              <label className="mandatory">{t("first_name")}</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="mandatory">{t("last_name")}</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </>
        )}

        {sponsorType === 'ENTITY' && (
          <>
            <h2>{t("entity_sponsor_information")}</h2>

            <div className="form-group">
              <label className="mandatory">{t("entity_name")}</label>
              <input type="text" name="entityName" value={formData.entityName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="mandatory">{t("first_name")}</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="mandatory">{t("last_name")}</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </>
        )}

        <div className="form-group">
          <label className="mandatory">{t("phone_number")}</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">{t("date_Of_birth")}</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">{t("password")}</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">{t("confirm_password")}</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">{t("nationality")}</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">{t("gender")}</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">{t("select_gender")}</option>
            <option value="MALE">{t("male")}</option>
            <option value="FEMALE">{t("female")}</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="mandatory">{t("region")}</label>
          <select name="region" value={formData.region} onChange={handleChange} required>
            <option value="">{t("select_region")}</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="mandatory">{t("district")}</label>
          <select name="district" value={formData.district} onChange={handleChange} required>
            <option value="">{t("select_district")}</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="mandatory">{t("ward")}</label>
          <select name="ward" value={formData.ward} onChange={handleChange} required>
            <option value="">{t("select_ward")}</option>
            {wards.map((ward, index) => (
              <option key={index} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t("street")}</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>

        <h2>{t("contact_info")}</h2>
        <div className="form-group">
          <label>{t("email")}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t("contact_number")}r</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t("facebook")}</label>
          <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t("youtube")}</label>
          <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t("instagram")}</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t("twitter")}</label>
          <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>{t("linkedIn")}</label>
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </div>

        <button type="submit">{t("submit")}</button>
      </form>
    </div>
  );
}

export default SponsorProfile;
