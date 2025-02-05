import React from 'react';

const TopBar = ({ onClose }) => {
  return (
    <div className="top-bar">
      <div className="company-name">COMPANY NAME</div>
      <div className="close-container">
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default TopBar;
