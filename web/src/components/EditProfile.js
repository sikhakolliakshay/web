import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // If no userId is found in localStorage, redirect to the login page
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`);
        setUser(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        message.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [form, navigate]);

  const handleSubmit = async (values) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`, values);
      message.success('Profile updated successfully');
      navigate('/account'); // Navigate back to the account page
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleEditContactInfo = () => {
    navigate('/edit-contact-info'); // Navigate to EditContactInfo page
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Region" name="region">
          <Input />
        </Form.Item>
        <Form.Item label="District" name="district">
          <Input />
        </Form.Item>
        <Form.Item label="Ward" name="ward">
          <Input />
        </Form.Item>
        <Form.Item label="Date of Birth" name="dob">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={handleEditContactInfo}>
            Edit Contact Information
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
