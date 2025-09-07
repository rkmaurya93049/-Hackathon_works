import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>
          KNOW YOUR <span className="highlight">HARVEST</span> BEFORE{" "}
          YOU
          <span className="highlight2"> GROW.</span>
        </h1>
        <p>
          An AI-powered farming assistant that predicts crop yield using weather,
          soil, and past harvest data — helping farmers plan smarter and grow
          better.
        </p>
       
       
        <Link to="/predict" className="cta-btn">
          Start Using Now
        </Link>
      </div>
    </section>
  );
}

export default Hero;
