import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, DatePicker, Modal, message, Select, Switch, Pagination } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './CvsPage.css';

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
  const { t } = useTranslation();
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
        message.success(t("cv_updated_sucessfully"));
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/cvs`, values);
        message.success(t("cv_created_sucessfully"));
      }

      fetchCvs(currentPage, pageSize);
      handleCancel();
    } catch (error) {
      message.error(t("failed_submit_cv"));
      console.error(t("error_cv"), error);
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
      name: cv.name,
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
      message.success(t("cv_deleted_successfully"));
      fetchCvs(currentPage, pageSize);
    } catch (error) {
      message.error(t("failed_delete_cv"));
      console.error(t("error_delete_cv"), error);
    }
  };

  return (
<div className="cvs-page">
    <h1 className="page-title">{t("cv_text")}</h1>
    
    <div className="buttons-container">
        <Button type="primary" className="return-button" onClick={() => navigate('/account')}>
            {t("return_page")}
        </Button>

        <Button type="primary" className="create-button" onClick={showModal}>
            {t("create_cv")}
        </Button>
    </div>

    <div style={{ marginTop: 20 }}>
        <h2>{t("total_cv")} {cvs.length}</h2>
    </div>

    <Modal title={editMode ? "Edit CV" : "Create CV"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="name" label={t("team_Name")} rules={[{ required: true, message: 'Please enter the team name' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="person" label={t("team_Contact_Name")} rules={[{ required: true, message: 'Please enter the contact person\'s name' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="phone" label={t("contact_Person_Number")} rules={[{ required: true, message: 'Please enter the contact person\'s phone number' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="type" label={t("contact_Person_Role")} rules={[{ required: true, message: 'Please select the contact person\'s role' }]}>
                <Select>
                    <Option value="Manager">{t("manager")}</Option>
                    <Option value="Coach">{t("coach")}</Option>
                </Select>
            </Form.Item>
            <Form.Item name="start_date" label={t("start_Date")} rules={[{ required: true, message: 'Please select the start date' }]}>
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="isCurrent" label={t("current_Team")} valuePropName="checked">
                <Switch checkedChildren={t("yes")} unCheckedChildren={t("no")} />
            </Form.Item>
            <Form.Item name="end_date" label={t("end_Date")}>
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {editMode ? t("update") : t("submit")}
                </Button>
            </Form.Item>
        </Form>
    </Modal>

    <div className="cvs-list">
        {cvs.map(cv => (
            <div key={cv._id} className="cv-card">
                <h3>{cv.name}</h3>
                <p><strong>{t("contact_person")}:</strong> {cv.person}</p>
                <p><strong>{t("contact_number")}:</strong> {cv.phone}</p>
                <p><strong>{t("role")}:</strong> {cv.type}</p>
                <p><strong>{t("start_Date")}:</strong> {moment(cv.start_date).format('YYYY-MM-DD')}</p>
                <p><strong>{t("current_Team1")}:</strong> {cv.isCurrent ? "Yes" : "No"}</p>
                {cv.end_date && <p><strong>{t("end_Date")}:</strong> {moment(cv.end_date).format('YYYY-MM-DD')}</p>}
                <Button type="primary" className="edit-button" onClick={() => handleEdit(cv)}>{t("cv_edit")}</Button>
                <Button type="danger" className="delete-button" onClick={() => handleDelete(cv._id)}>{t("cv_delete")}</Button>
            </div>
        ))}
    </div>

    <Pagination
        current={currentPage}
        total={totalCvs}
        pageSize={pageSize}
        onChange={handlePageChange}
        className="pagination"
    />
</div>
  );
};

export default CvsPage;
