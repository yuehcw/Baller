import React, { useContext, useEffect, useState } from "react";
import login_image from "../../image/basketball_illustration.png";
import Signup from "../../components/Signup/Signup";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Spin } from "antd";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const { loginUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`/users/login`, formData, {
        headers: { noAuth: true },
      });
      console.log("Login successful", response.data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      loginUser(user);
      navigate("/myteam");
    } catch (error) {
      console.error("Error logging in", error);
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="loginPage-content">
      <div className={`main-content-login ${showSignup ? "blur" : ""}`}>
        <div className="left-panel-login">
          <div className="login-form">
            <h2>Login</h2>
            <p>Welcome back! Please enter your details.</p>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                name="emailAddress"
                placeholder="Test with: test@gmail.com"
                value={formData.emailAddress}
                onChange={handleChange}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Test with: test"
                value={formData.password}
                onChange={handleChange}
              />
              <a>Forgot Password?</a>
              <button type="submit" disabled={isLoading}>
                {isLoading ? <Spin style={{ color: "white" }} /> : "Sign In"}
              </button>
              <div className="alternative-login">
                <p>Or</p>
                <button className="google-login">Sign In with Google</button>
                <button className="facebook-login">
                  Sign In with Facebook
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
              <p>
                Don't have an account?{" "}
                <span onClick={handleSignupClick} className="signup-link">
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="right-panel-login">
          <img src={login_image} alt="login_image" />
        </div>
      </div>
      {showSignup && <Signup onClose={handleCloseSignup} />}
    </div>
  );
};

export default LoginPage;
