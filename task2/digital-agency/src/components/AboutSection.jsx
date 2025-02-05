import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-image"><img src="./img/Rectangle 3.png" alt="" /></div>

      <div className="about-content">
        <span className="section-badge">About Us</span>
        <h2 className="about-heading">Design & Develop For Better Solution</h2>
        <p className="about-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <button className="about-button">
          <span className="button-label">Learn More</span>
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
