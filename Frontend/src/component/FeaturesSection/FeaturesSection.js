import React from "react";
import "./FeaturesSection.css";

const features = [
  { title: "AI-Powered Yield Prediction", img: "/YieldLogo.png" },
  { title: "Weather Based Tracking", img: "/CloudLogo.png" },
  { title: "Soil Type Integration", img: "/SoilLogo.png" },
  { title: "User Friendly Interface", img: "/UserFriendlyLogo.png" },
];

export default function FeaturesSection() {
  return (
    <section className="features">
      {features.map((feature, i) => (
        <div key={i} className="feature-card">
          <img src={feature.img} alt={feature.title} />
          <h3>{feature.title}</h3>
        </div>
      ))}
    </section>
  );
}
