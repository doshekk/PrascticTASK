import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-item">
          <h3 className="footer-title">Our Contact</h3>
          <p className="footer-text">Office: 4042 Imperial Road, UK</p>
          <p className="footer-text">Help: (0411) 425 277 / 425</p>
          <p className="footer-text">Email: inbox@finance.com</p>
        </div>
        <div className="footer-item">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
        </div>
        <div className="footer-item">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <div className="social-icon facebook"></div>
            <div className="social-icon twitter"></div>
            <div className="social-icon instagram"></div>
          </div>
        </div>
        <div className="footer-item subscribe">
          <h3 className="footer-title">Subscribe</h3>
          <div className="subscribe-box">
            <input type="email" placeholder="Your Email" className="subscribe-input" />
            <button className="subscribe-btn"></button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
