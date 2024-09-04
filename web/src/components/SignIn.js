import React, { useState } from "react";
import { Layout, Row, Col, Form, Input, Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ground from "../images/pexels-tima-miroshnichenko-6078297.jpg";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      identifier: values.username,
      password: values.password,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/users/login`, payload);

      if (response.status === 200 && response.data) {
        console.log(response.data);

        // Handling account suspension
        if (response.data.suspend) {
          message.error("Account Has Been Suspended. Contact Admin.");
          return;
        }

        // Store user ID in local storage
        localStorage.setItem("userId", response.data._id);

        // Set user data and navigate to user dashboard
        navigate("/users", { state: { user: response.data } });

        // Welcome message
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
    <Layout.Content style={{ height: "100vh", overflow: "hidden" }}>
      <Row style={{ height: "100%" }}>
        <Col span={12} style={{ height: "100%" }}>
          <img
            src={ground}
            alt="ground"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Col>
        <Col span={12} style={{ padding: "16px" }}>
          <Row justify="center" align="middle" style={{ height: "100%" }}>
            <Col span={16}>
              <h1 style={{ textAlign: "center", letterSpacing: "2px" }}>
                SOKASOKO-WEB
              </h1>
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
                  label="Username/Phone Number"
                  name="username"
                  rules={[
                    { required: true, message: "The phone or account number is required" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "The password must not be empty" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Button type="primary" block htmlType="submit" loading={loading}>
                        {loading ? <Spin /> : "Login"}
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button type="default" block onClick={goToSignUp}>
                        Sign Up
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default SignIn;
