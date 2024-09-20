import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

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
      message.success(t("profile_updated"));
      navigate('/account'); // Navigate back to the account page
    } catch (error) {
      message.error(t("failed_updated_profile"));
    }
  };

  const handleEditContactInfo = () => {
    navigate('/edit-contact-info'); // Navigate to EditContactInfo page
  };

  return (
    <div className="edit-profile">
      <h2>{t("edit_profile")}</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label={t("first_name")} name="firstName">
          <Input />
        </Form.Item>
        <Form.Item label={t("last_name")} name="lastName">
          <Input />
        </Form.Item>
        <Form.Item label={t("phone_number")} name="phone">
          <Input />
        </Form.Item>
        <Form.Item label={t("region")} name="region">
          <Input />
        </Form.Item>
        <Form.Item label={t("district")} name="district">
          <Input />
        </Form.Item>
        <Form.Item label={t("ward")} name="ward">
          <Input />
        </Form.Item>
        <Form.Item label={t("date_Of_birth")} name="dob">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("update_profile")}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={handleEditContactInfo}>
            {t("edit_contact_information")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
