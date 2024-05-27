import React, { useState } from "react";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./Signup.css";
import axios from "axios";

const SignupPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        formData,
        { headers: { noAuth: true } },
      );
      if (response.status === 201) {
        console.log("Account created successfully", response.data);
        onClose();
      }
    } catch (error) {
      console.error("Error creating account", error);
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="signup-page show">
      <div className="signup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <Avatar size={64} icon={<UserOutlined />} />
        <h2>Create a new account</h2>
        <p>Enter your details to register</p>
        <div className="separator"></div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Full Name *
            <div className="input-wrapper">
              <UserOutlined className="input-icon" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </label>
          <label>
            Email Address *
            <div className="input-wrapper">
              <MailOutlined className="input-icon" />
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
          </label>
          <label>
            Password *
            <div className="input-wrapper">
              <LockOutlined className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </label>
          <button type="submit" className="signup-page-submit-button">
            Register
          </button>
        </form>
        <p className="terms">
          By clicking Register, you agree to accept Baller Financial’s
          <span className="terms-text">Terms and Conditions</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
