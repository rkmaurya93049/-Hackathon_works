import React, { useState } from "react";
import "./About.css";

const teamMembers = [
  {
    name: "Raushan Kumar",
    description:
      "I am a Full-Stack Machine Learning Developer and AI Workflow Architect with a strong focus on building modular, scalable systems. My expertise lies in designing end-to-end machine learning pipelines, from data preprocessing and model development to API deployment and cloud integration. I specialize in bridging the gap between research and production, ensuring that solutions are not only accurate but also efficient, secure, and easy to scale. With hands-on experience in frontend, backend, and ML model integration, I aim to create systems that are both technically robust and user-friendly.",
    contribution:
      "As the lead Full-Stack ML Developer and AI Workflow Architect for this hackathon project, I designed and implemented the complete machine learning pipeline for crop yield prediction, including data preprocessing, feature engineering, and model training.",
    img: "/Raushan.jpg",
    align: "left",
    socials: [
      {
        type: "kaggle",
        link: "https://www.kaggle.com/raushan",
        icon: "KaggleBnW.png",
        hoverIcon: "KaggleG.png",
      },
      {
        type: "GitHub",
        link: "https://play.google.com/store/apps/dev?id=8142094440893413719",
        icon: "GithubBnW2.png",
        hoverIcon: "GithubG.png",
      },
      {
        type: "linkedin",
        link: "https://www.linkedin.com/in/raushan",
        icon: "LinkedInBnW.png",
        hoverIcon: "LinkedInG.png",
      },
      {
        type: "mail",
        link: "mailto:raushan@example.com",
        icon: "EmailBnW.png",
        hoverIcon: "EMailG.png",
      },
    ],
  },
  {
    name: "Shubham Kumar",
    description:
      "I am a full-stack developer who built the frontend of this project, integrated it with the backend, and ensured seamless communication between both ends. I focused on creating an intuitive user interface, implementing responsive layouts, and optimizing the performance for a smooth user experience.",

    contribution:
      "I handled the entire frontend development, connected all UI components to the backend APIs, implemented authentication and state management, and ensured data was displayed and updated in real-time. I also collaborated on designing the database schema, built secure REST APIs, and managed deployment for a production-ready application.",

    img: "/myimg.png",
    align: "right",
    socials: [
      {
        type: "GitHub",
        link: "https://play.google.com/store/apps/dev?id=8142094440893413719",
        icon: "GithubBnW2.png",
        hoverIcon: "GithubG.png",
      },
      {
        type: "linkedin",
        link: "https://www.linkedin.com/in/shubham",
        icon: "LinkedInBnW.png",
        hoverIcon: "LinkedInG.png",
      },
      {
        type: "mail",
        link: "mailto:shubham@example.com",
        icon: "EmailBnW.png",
        hoverIcon: "EMailG.png",
      },
    ],
  },
  {
    name: "Sudhanshu kr. Suman",
    description:
      "Hey, there. I am an Indie Game Developer and the owner of Indie game studio Silver Simian Games. With a passion for crafting unique gameplay experiences, I specialize in building immersive worlds, engaging mechanics, and polished visuals that bring stories to life.",

    contribution:
      "My contribution extends from designing UI/UX to creating all the possible visual assets for the project, including character design, environment art, and animations. I also worked on level design, gameplay mechanics, and performance optimization, ensuring the game runs smoothly across platforms. Additionally, I managed playtesting, feedback integration, and final deployment to deliver a complete and engaging player experience.",

    img: "/sudha.jpg",
    align: "left",
    socials: [
      {
        type: "googleplay",
        link: "https://github.com/Sudhanshu126",
        icon: "GithubBnW2.png",
        hoverIcon: "GithubG.png",
      },
      {
        type: "GitHub",
        link: "https://play.google.com/store/apps/dev?id=8142094440893413719",
        icon: "PlayStoreBnW.png",
        hoverIcon: "PlayStoreG.png",
      },
      {
        type: "linkedin",
        link: "https://www.linkedin.com/in/sudhanshu-kr-suman-15a84b257/",
        icon: "LinkedInBnW.png",
        hoverIcon: "LinkedInG.png",
      },
      {
        type: "mail",
        link: "sudhanshu.suman126@gmail.com",
        icon: "EmailBnW.png",
        hoverIcon: "EMailG.png",
      },
    ],
  },
];

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            Soil Buddy is your smart farming companion, built to help users plan
            better and grow more. Using a powerful machine learning model, Soil
            Buddy predicts crop yield by considering key factors such as
            rainfall, soil type, temperature, and past yield data.
          </p>
          <p>
            Our goal is to bring the power of technology into the hands of users
            in a simple, useful, and accessible way. With Soil Buddy, you don’t
            just farm—you farm with foresight.
          </p>
        </div>
        <div className="about-logo">
          <img src="/SoilBuddyLogoNoBGAnim.svg" alt="Soil Buddy Logo" />
        </div>
      </header>

      <section className="team-section">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-card ${member.align === "right" ? "reverse" : ""}`}
          >
            <div className="team-image">
              <img src={member.img} alt={member.name} className="profile-pic" />

              {/* ✅ Social icons below image */}
              <div className="social-icons">
                {member.socials.map((social, idx) => (
                  <SocialIcon key={idx} social={social} />
                ))}
              </div>
            </div>

            <div className="team-info">
              <h2>{member.name}</h2>
              <p>{member.description}</p>
              <h3>Contribution to this project</h3>
              <p>{member.contribution}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const SocialIcon = ({ social }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={hover ? social.hoverIcon : social.icon}
        alt={social.type}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "2px solid #e0a500",
          padding: "2px",
          background: "black",
          transition: "transform 0.2s ease",
        }}
      />
    </a>
  );
};

export default About;
