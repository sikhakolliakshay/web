import React, { useState, useEffect } from 'react';
import regionsData from '../../GeoLocation/Region.json';
import districtsData from '../../GeoLocation/District.json';
import wardsData from '../../GeoLocation/Wards.json';
import './PlayerProfile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlayerProfile() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    gender: '',
    nationality: '',
    shortBio: '',
    educationalLevel: '',
    playerPosition: '',
    preferredFoot: '',
    nationalTeamCallUps: '',
    nationalYouthTeamCallUps: '',
    umissetaGames: '',
    umitashumtaGames: '',
    height: '',
    weight: '',
    fifaId: '',
    region: '',
    district: '',
    ward: '',
    street: '',
    type: 'PLAYER',
  });

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();

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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(formData.birthDate).getFullYear();
    const age = currentYear - birthYear;

    if (age < 18) {
        alert('Registration is only allowed for individuals 18 years and older.');
        return;
    }

    if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/users`, formData);
        
        if (response.status === 201) {
            alert('Registration successful!');
            navigate('/users');
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 500) {
                alert('A server error occurred. Please try again later or contact the Administrator.');
            } else if (error.response.data.message.includes('already exists')) {
                alert('A user with the same information already exists.');
            } else {
                alert('An unexpected error occurred. Please check the console for details.');
            }
        } else {
            alert('An error occurred. Please check your network connection and try again.');
        }
        console.error('There was an error submitting the form:', error);
    }
};



  return (
    <div className="player-profile-container">
      <div className="player-profile-header">
        Player Profile Registration
      </div>
      <form className="player-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="mandatory">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Middle Name</label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="mandatory">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
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
          <label className="mandatory">Birth Date</label>
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
        {/* Additional fields */}
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
          <label>Short Bio</label>
          <textarea name="shortBio" value={formData.shortBio} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="mandatory">Educational Level</label>
          <select name="educationalLevel" value={formData.educationalLevel} onChange={handleChange} required>
            <option value="">Select Education Level</option>
            <option value="graduate">Graduate</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="diploma">Diploma</option>
            <option value="a-level">A-level</option>
            <option value="o-level">O-level</option>
            <option value="dropout">Dropout</option>
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">Player Position/s</label>
          <select name="playerPosition" value={formData.playerPosition} onChange={handleChange} required>
            <option value="">Select Position</option>
            <option value="goalkeeper">Goalkeeper</option>
            <option value="center-back">Center Back</option>
            <option value="right-back">Right Back</option>
            <option value="left-back">Left Back</option>
            <option value="wing-back">Wing Back</option>
            <option value="offensive-midfielder">Offensive Midfielder</option>
            <option value="defensive-midfielder">Defensive Midfielder</option>
            <option value="striker">Striker</option>
            <option value="winger">Winger</option>
          </select>
        </div>
        <div className="form-group">
          <label className="mandatory">Preferred Foot</label>
          <select name="preferredFoot" value={formData.preferredFoot} onChange={handleChange} required>
            <option value="">Select Preferred Foot</option>
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="form-group">
          <label>National Team Call Ups</label>
          <input type="text" name="nationalTeamCallUps" value={formData.nationalTeamCallUps} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>National Youth Team Call Ups</label>
          <input type="text" name="nationalYouthTeamCallUps" value={formData.nationalYouthTeamCallUps} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Umisseta Games</label>
          <input type="text" name="umissetaGames" value={formData.umissetaGames} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Umitashumta Games</label>
          <input type="text" name="umitashumtaGames" value={formData.umitashumtaGames} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Height (cm)</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>FIFA ID</label>
          <input type="text" name="fifaId" value={formData.fifaId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="mandatory">Region</label>
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
          <label className="mandatory">District</label>
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
          <label className="mandatory">Ward</label>
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
          <label className="mandatory">Street</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default PlayerProfile;
