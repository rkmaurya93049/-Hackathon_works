import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        const err = await res.json();
        setError(err.detail || "Login failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-section">
          <h2>Log In</h2>
          <p className="welcome-text">Welcome! Please enter your details.</p>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <p className="error-text">{error}</p>}

            <a href="/" className="forgot-link">Forgot password?</a>
            <button type="submit" className="login-btn">Log In</button>
          </form>
        </div>
        <div className="image-section">
          <img src="/LogInImage.png" alt="Farmer with phone" />
        </div>
      </div>
    </div>
  );
};

export default Login;
