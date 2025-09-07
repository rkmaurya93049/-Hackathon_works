import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <div className="logo">
            <img src="/SoilBuddyLogoNoBG.png" alt="logo" />
            <span className="logo_name">SOILBUDDY</span>
          </div>
          <p>
            Agriculture is highly dependent on environmental factors such as
            soil quality, rainfall, and fertilizer use. Our tool helps farmers
            make data-driven decisions by predicting crop yield accurately.
          </p>
        </div>

        <div className="footer-section fetures">
          <h4>Features</h4>
          <ul>
            <li>
              <a href="#input">Predict yield Manually</a>
            </li>
            <li>
              <a href="#output">Realtime weather integration</a>
            </li>
            <li>
              <a href="#about">Graph representation</a>
            </li>
          </ul>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/predict">
                Predict
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <a href="mailto:help.silversimiangames@gmail.com">Mail Us</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} AI Crop Yield Predictor. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
