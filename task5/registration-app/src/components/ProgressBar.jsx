
import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="progress-bar">
      {[1, 2, 3].map(step => (
        <div
          key={step}
          className={`step ${currentStep >= step ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
