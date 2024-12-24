import React, { useState } from 'react';
import './LoginSignUp.css';
import email_icon from '../assets/email.png';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    tc: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email: formData?.email,
        password: formData?.password,
      });
      console.log("Response:", response);

      if (response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        localStorage.setItem("userLogin", response?.data?.token);
        setTimeout(() => {
            window.location.reload()
        }, 3000);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Error:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/register', formData);
      console.log("Response:", response);

      if (response?.data?.status === 'success') {
        toast.success("Registration successful!");
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during sign-up.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="submit-container">
          <div
            onClick={() => {
              setAction("Sign Up");
            }}
            className={action === "Sign Up" ? "submit active" : "submit"}
          >
            Sign Up
          </div>
          <div
            onClick={() => {
              setAction("Login");
            }}
            className={action === "Login" ? "submit active" : "submit"}
          >
            Login
          </div>
        </div>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {action === "Sign Up" && (
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        {action === "Login" && (
          <div className="forgot-password">
            Lost Password? <span>Click Here</span>
          </div>
        )}

        <div className="action-button">
          <button
            onClick={action === "Login" ? handleLogin : handleSignUp}
            className="primary-button"
          >
            {action === "Login" ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
