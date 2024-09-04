import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './EditContactInfo.css';

const EditContactInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // If no userId is found in localStorage, redirect to the login page
      navigate('/');
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`);
          setUser(response.data);
          form.setFieldsValue({
            email: response.data.email,
            contact_number: response.data.contactNumber,
            facebook: response.data.facebook,
            youtube: response.data.youtube,
            instagram: response.data.instagram,
            twitter: response.data.twitter,
            linkedin: response.data.linkedin,
          });
        } catch (error) {
          message.error('Failed to fetch user data');
        }
      };

      fetchUserData();
    }
  }, [form, navigate]);

  const handleSubmit = async (values) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`, values);
      message.success('Contact information updated successfully');
      navigate('/account'); // Navigate back to the account page
    } catch (error) {
      message.error('Failed to update contact information');
    }
  };

  return (
    <div className="edit-contact-info">
      <h2>Edit Contact Information</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Contact Number" name="contact_number">
          <Input />
        </Form.Item>
        <Form.Item label="Facebook" name="facebook">
          <Input />
        </Form.Item>
        <Form.Item label="YouTube" name="youtube">
          <Input />
        </Form.Item>
        <Form.Item label="Instagram" name="instagram">
          <Input />
        </Form.Item>
        <Form.Item label="Twitter" name="twitter">
          <Input />
        </Form.Item>
        <Form.Item label="LinkedIn" name="linkedin">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Contact Info
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditContactInfo;
