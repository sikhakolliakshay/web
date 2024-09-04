import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, DatePicker, Modal, message, Select, Switch, Pagination } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const CvsPage = () => {
  const [cvs, setCvs] = useState([]);
  const [totalCvs, setTotalCvs] = useState(0); // Total number of CVs
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize] = useState(5); // Number of CVs per page
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCv, setCurrentCv] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/');
    } else {
      fetchCvs(currentPage, pageSize);
    }
  }, [userId, navigate, currentPage]);

  const fetchCvs = async (page, limit) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/cvs`, {
        params: { userId, page, limit }
      });
      if (Array.isArray(response.data.data)) {
        setCvs(response.data.data); 
        setTotalCvs(response.data.total); // Assuming the total number of CVs is returned in response.data.total
      } else {
        console.error('Unexpected data format:', response.data);
        setCvs([]);
      }
    } catch (error) {
      message.error('Failed to fetch CVs');
      console.error('Error fetching CVs:', error);
    }
  };

  const getUserIdByUsername = async (username) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/users/${userId}`);
      return response.data._id || null;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (values) => {
    try {
      const userId = await getUserIdByUsername(values.createdBy);
      if (!userId) {
        message.error('Invalid user');
        return;
      }
      values.createdBy = userId;

      if (editMode && currentCv) {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/v1/cvs/${currentCv._id}`, values);
        message.success('CV updated successfully');
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/cvs`, values);
        message.success('CV created successfully');
      }

      fetchCvs(currentPage, pageSize);
      handleCancel();
    } catch (error) {
      message.error('Failed to submit CV');
      console.error('Error submitting CV:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditMode(false);
    setCurrentCv(null);
    form.resetFields();
  };

  const handleEdit = (cv) => {
    setCurrentCv(cv);
    form.setFieldsValue({
      team_name: cv.name,
      person: cv.person,
      phone: cv.phone,
      type: cv.type,
      start_date: moment(cv.start_date),
      end_date: cv.end_date ? moment(cv.end_date) : null,
      isCurrent: cv.isCurrent,
    });
    setEditMode(true);
    showModal();
  };

  const handleDelete = async (cvId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/cvs/${cvId}`);
      message.success('CV deleted successfully');
      fetchCvs(currentPage, pageSize);
    } catch (error) {
      message.error('Failed to delete CV');
      console.error('Error deleting CV:', error);
    }
  };

  return (
    <div className="cvs-page">
      <Button type="primary" onClick={() => navigate('/account')}>
        Return to Account Page
      </Button>

      <Button type="primary" onClick={showModal} style={{ marginTop: 16 }}>
        Create CV
      </Button>

       {/* Display the total number of CVs */}
       <div style={{ marginTop: 20 }}>
        <h2>Total CVs: {cvs.length}</h2>
      </div>

      <Modal title={editMode ? "Edit CV" : "Create CV"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Team Name" rules={[{ required: true, message: 'Please enter the team name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="person" label="Team Contact Person" rules={[{ required: true, message: 'Please enter the contact person\'s name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Contact Person Number" rules={[{ required: true, message: 'Please enter the contact person\'s phone number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Contact Person Role" rules={[{ required: true, message: 'Please select the contact person\'s role' }]}>
            <Select>
              <Option value="Manager">Manager</Option>
              <Option value="Coach">Coach</Option>
            </Select>
          </Form.Item>
          <Form.Item name="start_date" label="Start Date" rules={[{ required: true, message: 'Please select the start date' }]}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="isCurrent" label="Is My Current Team" valuePropName="checked">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item name="end_date" label="End Date">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editMode ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Displaying the CVs */}
      <div style={{ marginTop: 20 }}>
        {cvs.map(cv => (
          <div key={cv._id} style={{ marginBottom: 20 }}>
            <h3>{cv.name}</h3>
            <p><strong>Contact Person:</strong> {cv.person}</p>
            <p><strong>Contact Number:</strong> {cv.phone}</p>
            <p><strong>Role:</strong> {cv.type}</p>
            <p><strong>Start Date:</strong> {moment(cv.start_date).format('YYYY-MM-DD')}</p>
            <p><strong>Current Team:</strong> {cv.isCurrent ? "Yes" : "No"}</p>
            {cv.end_date && <p><strong>End Date:</strong> {moment(cv.end_date).format('YYYY-MM-DD')}</p>}
            <Button type="primary" onClick={() => handleEdit(cv)}>Edit</Button>
            <Button type="danger" onClick={() => handleDelete(cv._id)} style={{ marginLeft: 10 }}>Delete</Button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <Pagination
        current={currentPage}
        total={totalCvs}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default CvsPage;
