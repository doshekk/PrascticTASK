import React from "react";

const ContentSection = () => {
  return (
    <section className="content-section" id="home">
      <div className="content-image image-right"><img src="./img/Rectangle 1.png" alt="" /></div>
      <div className="content-image image-center"><img src="./img/Rectangle 2.png" alt="" /></div>

      <h3 className="content-header subheader">Creative work, creative mind</h3>
      <h1 className="content-header main-title">We Are Digital Creative Agency</h1>
      <p className="content-header description">Lorem ipsum dolor sit amet...</p>

      <button className="cta-button">
        <span className="button-text">Get in Touch</span>
      </button>

      <div className="service-card service-card-1 design-card">
        <div className="card-icon">
          <div className="icon-shape"></div>
        </div>
        <div className="card-content">
          <h4 className="card-title">Design</h4>
          <p className="card-description">Lorem ipsum dolor sit amet...</p>
        </div>
      </div>

      <div className="service-card service-card-2 development-card">
        <div className="card-icon">
          <div className="icon-shape"></div>
          <div className="icon-shape"></div>
        </div>
        <div className="card-content">
          <h4 className="card-title">Development</h4>
          <p className="card-description">Lorem ipsum dolor sit amet...</p>
        </div>
      </div>

      <div className="service-card service-card-3 qa-card">
        <div className="card-icon">
          <div className="icon-shape"></div>
          <div className="icon-shape"></div>
        </div>
        <div className="card-content">
          <h4 className="card-title">Testing & QA</h4>
          <p className="card-description">Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
