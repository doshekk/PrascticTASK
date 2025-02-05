import React from "react";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-header">
        <div className="portfolio-title">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">View Our Case Studies</h2>
        </div>
        <div className="portfolio-content">
          <p className="section-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <a href="#" className="view-all-link">
            <span className="view-all-text">View All</span>
            <span className="view-all-arrow"></span>
          </a>
        </div>
      </div>

      <div className="portfolio-grid">
        <div className="project-card">
          <img src="./img/Rectangle 5 (3).png" alt="Project 1" className="card-image" />
          <button className="card-button">
            <span className="button-arrow"></span>
          </button>
        </div>
        <div className="project-card">
          <img src="./img/Rectangle 5 (4).png" alt="Project 2" className="card-image" />
          <button className="card-button">
            <span className="button-arrow"></span>
          </button>
        </div>
        <div className="project-card">
          <img src="./img/Rectangle 5 (5).png" alt="Project 3" className="card-image" />
          <button className="card-button">
            <span className="button-arrow"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
