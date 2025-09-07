import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        window.location.href="/"
      } else {
        const err = await res.json();
        setError(err.detail || "Signup failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="form-section">
          <h2>Sign Up</h2>
          <p className="welcome-text">Create your account to get started.</p>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Mobile Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="switch-text">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
        <div className="image-section">
          <img src="/LogInImage.png" alt="Farmer signing up" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
