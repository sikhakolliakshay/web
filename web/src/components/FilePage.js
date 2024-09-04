import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, message, Typography, Radio } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FilePage.css';

const { Title } = Typography;

const FilePage = () => {
  const [form] = Form.useForm();
  const [mediaItems, setMediaItems] = useState([]);
  const [userData, setUserData] = useState(null); // State for user data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      // If no userId is found in localStorage, redirect to the login page
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`);
        setUserData(response.data.data || {});
      } catch (error) {
        message.error('Failed to fetch user data');
        console.error('Error fetching user data:', error);
      }
    };

    const fetchMediaItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/medias`);
        setMediaItems(response.data.data || []);
      } catch (error) {
        message.error('Failed to fetch media items');
        console.error('Error fetching media items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchMediaItems();
  }, [userId, navigate]);

  const handleAddMedia = async (values) => {
    const { title, description, type, url } = values;

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/medias`, {
        title,
        description,
        type,
        url,
        createdBy: userId,
      });
      message.success('Media added successfully');
      form.resetFields();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/medias`);
      setMediaItems(response.data.data || []);
    } catch (error) {
      message.error('Failed to add media');
      console.error('Error adding media:', error);
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/medias/${mediaId}`);
      message.success('Media deleted successfully');

      // Refresh the media items
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/medias`);
      setMediaItems(response.data.data || []);
    } catch (error) {
      message.error('Failed to delete media');
      console.error('Error deleting media:', error);
    }
  };

  return (
    <div className="file-page">
      <div className="header">
      <Button onClick={() => navigate('/account')} className="return-button">
        Return to Account Page
      </Button>
      <div className="header-title-container">
        <h1>Media File</h1>
      </div>
    </div>

      <div className="add-media-form">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddMedia}
          initialValues={{ type: 'Image' }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Enter media title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select the type' }]}
          >
            <Radio.Group>
              <Radio value="Image">Image</Radio>
              <Radio value="Link">Link</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: 'Please enter the URL' }]}
          >
            <Input placeholder="Enter media URL" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add File
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="media-list">
        <h2>Existing Media</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <List
            dataSource={mediaItems}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteMedia(item._id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <div className="media-item">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Type: {item.type}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    View Media
                  </a>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default FilePage;
