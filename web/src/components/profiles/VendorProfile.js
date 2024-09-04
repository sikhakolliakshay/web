//completed
import React, { useState, useEffect } from 'react';
import regionsData from '../../GeoLocation/Region.json';
import districtsData from '../../GeoLocation/District.json';
import wardsData from '../../GeoLocation/Wards.json';
import './VendorProfile.css';
import axios from 'axios';  // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom';

function VendorProfile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessType: '',
    dob: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    nationality: '',
    region: '',
    district: '',
    ward: '',
    street: '',
    contactNumber: '',
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    type:'VENDOR',
  });

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract regions from JSON data
    setRegions(regionsData.features.map(region => region.properties.region));
  }, []);

  useEffect(() => {
    // Extract districts from JSON data
    setDistricts(districtsData.features.map(district => district.properties.District));
  }, []);

  useEffect(() => {
    // Extract wards from JSON data
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
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="vendor-profile-container">
      <div className='vendor-profile-header'>
        Vendor Profile Registration
      </div>
      <form className="vendor-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mandatory">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">Business Type</label>
          <input type="text" name="businessType" value={formData.businessType} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
          <label className="mandatory">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">Nationality</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="mandatory">Region</label>
          <select name="region" value={formData.region} onChange={handleChange} required>
            <option value="">Select Region</option>
            {regions.map(region => <option key={region} value={region}>{region}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">District</label>
          <select name="district" value={formData.district} onChange={handleChange} required>
            <option value="">Select District</option>
            {districts.map(district => <option key={district} value={district}>{district}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">Ward</label>
          <select name="ward" value={formData.ward} onChange={handleChange} required>
            <option value="">Select Ward</option>
            {wards.map(ward => <option key={ward} value={ward}>{ward}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Street</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
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
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default VendorProfile;
