import React, { useState, useEffect } from 'react';
import regionsData from '../../GeoLocation/Region.json';
import districtsData from '../../GeoLocation/District.json';
import wardsData from '../../GeoLocation/Wards.json';
import './SponsorProfile.css';
import axios from 'axios';
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
        Sponsor Profile Registration
      </div>
      <form className="sponsor-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mandatory">Sponsor Type</label>
          <select name="sponsorType" value={sponsorType} onChange={e => setSponsorType(e.target.value)} required>
            <option value="INDIVIDUAL">Individual</option>
            <option value="ENTITY">Entity</option>
          </select>
        </div>

        {sponsorType === 'INDIVIDUAL' && (
          <>
            <h2>Individual Sponsor Information</h2>
            <div className="form-group">
              <label className="mandatory">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="mandatory">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </>
        )}

        {sponsorType === 'ENTITY' && (
          <>
            <h2>Entity Sponsor Information</h2>

            <div className="form-group">
              <label className="mandatory">Entity Name</label>
              <input type="text" name="entityName" value={formData.entityName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="mandatory">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="mandatory">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </>
        )}

        <div className="form-group">
          <label className="mandatory">Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">Nationality</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="mandatory">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="mandatory">Select Region</label>
          <select name="region" value={formData.region} onChange={handleChange} required>
            <option value="">Select Region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="mandatory">Select District</label>
          <select name="district" value={formData.district} onChange={handleChange} required>
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="mandatory">Select Ward</label>
          <select name="ward" value={formData.ward} onChange={handleChange} required>
            <option value="">Select Ward</option>
            {wards.map((ward, index) => (
              <option key={index} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Street</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>

        <h2>Contact Info</h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Facebook</label>
          <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>YouTube</label>
          <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Instagram</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Twitter</label>
          <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SponsorProfile;
