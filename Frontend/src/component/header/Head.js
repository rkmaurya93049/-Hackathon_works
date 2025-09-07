import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("token"); 
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/SoilBuddyLogoNoBG.png" alt="logo" />
        <span className="logo_name">SOILBUDDY</span>
      </div>

      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <Link to="/" className="link" onClick={() => setIsOpen(false)}>
          Home
        </Link>

        <div
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="link dropdown-toggle">Features ▾</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/predict"
                className="dropdown-item"
                onClick={() => setIsOpen(false)}
              >
                Predict
              </Link>
              <Link
                to="/input-data"
                className="dropdown-item"
                onClick={() => setIsOpen(false)}
              >
                Input Data
              </Link>
            </div>
          )}
        </div>

        <Link to="/about" className="link" onClick={() => setIsOpen(false)}>
          About
        </Link>
        <a href="#contact" className="link" onClick={() => setIsOpen(false)}>
          Contact
        </a>
      </nav>

      <div className="auth">
        {user ? (
          <div className="logged-in">
            <span className="username">Hi, {user.fullName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="login-btn"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/signin"
              className="signup-btn"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX /> : <HiMenu />}
      </div>
    </header>
  );
}

export default Header;
