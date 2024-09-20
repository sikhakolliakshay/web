import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './EditContactInfo.css';

const EditContactInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

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
      message.success(t("contact_updated"));
      navigate('/account'); // Navigate back to the account page
    } catch (error) {
      message.error(t("failed_updated_profile"));
    }
  };

  return (
    <div className="edit-contact-info">
      <h2>{t("edit_contact_information")}</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label={t("email")} name="email">
          <Input />
        </Form.Item>
        <Form.Item label={t("contact_number")} name="contact_number">
          <Input />
        </Form.Item>
        <Form.Item label={t("facebook")} name="facebook">
          <Input />
        </Form.Item>
        <Form.Item label={t("youtube")} name="youtube">
          <Input />
        </Form.Item>
        <Form.Item label={t("instagram")} name="instagram">
          <Input />
        </Form.Item>
        <Form.Item label={t("twitter")} name="twitter">
          <Input />
        </Form.Item>
        <Form.Item label={t("linkedIn")} name="linkedin">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("update_contact")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditContactInfo;
