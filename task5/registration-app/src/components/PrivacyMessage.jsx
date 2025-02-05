import React from 'react';

const PrivacyMessage = ({ onClose }) => {
  return React.createElement(
    'div',
    { className: 'privacy-message', id: 'privacy-message' },
    React.createElement(
      'span',
      null,
      '🔒 We take privacy issues seriously. You can be sure that your personal data is securely protected.'
    ),
    React.createElement(
      'button',
      { className: 'close-message', onClick: onClose },
      '✖'
    )
  );
};

export default PrivacyMessage;
