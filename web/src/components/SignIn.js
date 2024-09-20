import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Form, Input, Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import './SignIn.css';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      identifier: values.username,
      password: values.password,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/users/login`, payload);

      if (response.status === 200 && response.data) {
        if (response.data.suspend) {
          message.error("Account Has Been Suspended. Contact Admin.");
          return;
        }

        localStorage.setItem("userId", response.data._id);
        navigate("/users", { state: { user: response.data } });

        const user = response.data;
        const welcomeMessage = `Welcome ${
          user.type === "ACADEMY" ? user.academyName : `${user.firstName} ${user.lastName}`
        }`;
        message.success(welcomeMessage);
      } else {
        message.error("Unexpected response from server.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          message.error("User not found!");
        } else if (error.response.status === 400) {
          message.error("Incorrect username or password.");
        } else {
          message.error("User not found!");
        }
      } else if (error.request) {
        message.error("No response from server. Please check your network.");
      } else {
        message.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please check the form fields.");
    console.log("Failed:", errorInfo);
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Layout.Content className={`sign-in-container ${isVisible ? 'slide-in' : ''}`}>
      <div className="form-box">
        <h1 className="sign-in-header">{t("sokasoko_web")}</h1>
        <Form
          name="signin"
          layout="vertical"
          requiredMark="optional"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <Form.Item
            label={t("usernameOrphonenumber")}
            name="username"
            rules={[
              { required: true, message: "The phone or account number is required" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username or phone number"
            />
          </Form.Item>

          <Form.Item
            label={t("user_password")}
            name="password"
            rules={[{ required: true, message: "The password must not be empty" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Button type="primary" block htmlType="submit" loading={loading}>
                  {loading ? <Spin /> : t("login") }
                </Button>
              </Col>
              <Col span={12}>
                <Button type="default" block onClick={goToSignUp}>
                  {t("signUp")}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Layout.Content>
  );
};

export default SignIn;
