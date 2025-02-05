import React from "react";

const TestimonySection = () => {
  return (
    <section id="contact" className="testimony-section">
      <div className="testimony-header">
        <h3 className="section-subtitle">Testimony</h3>
        <h2 className="section-title">What Do Our Clients Says About Us</h2>
      </div>

      <div className="gradient-blur"></div>

      <div className="client-avatar">
        <div className="avatar-frame"></div>
        <img src="./img/Ellipse 6.png" alt="Client" className="avatar-image" />
      </div>

      <blockquote className="testimonial-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </blockquote>

      <div className="client-info">
        <p className="client-name">James Jokovic</p>
        <p className="client-role">IT Consultant</p>
      </div>

      <div className="decorative-dots">
        <div className="dot dot-1"><img src="./img/Ellipse 2.png" alt="" /></div>
        <div className="dot dot-2"><img src="./img/Ellipse 7.png" alt="" /></div>
        <div className="dot dot-3"><img src="./img/Ellipse 4.png" alt="" /></div>
        <div className="dot dot-4"><img src="./img/Ellipse 3.png" alt="" /></div>
        <div className="dot dot-5"><img src="./img/Ellipse 8.png" alt="" /></div>
        <div className="dot dot-6"><img src="./img/Ellipse 9.png" alt="" /></div>
      </div>

      <div className="navigation-dots">
        <div className="nav-dot active"></div>
        <div className="nav-dot"></div>
        <div className="nav-dot"></div>
        <div className="nav-dot"></div>
      </div>
    </section>
  );
};

export default TestimonySection;
