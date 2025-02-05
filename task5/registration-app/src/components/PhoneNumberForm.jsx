import React, { useState, useEffect } from 'react';
import PrivacyMessage from './PrivacyMessage';
import EmailPasswordForm from './EmailPasswordForm';
import ProgressBar from './ProgressBar';

const PhoneNumberForm = ({ goToNextStep }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [showPrivacyMessage, setShowPrivacyMessage] = useState(true);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleResendCode = () => {
    setTimer(30);
    setResendEnabled(false);
    console.log("Verification code resent.");
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handlePhoneNumberChange = (e) => {
    if (!isVerified) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPhoneNumberEntered && phoneNumber) {
      setIsPhoneNumberEntered(true);
      setCurrentStep(2);
      console.log("Phone Number Submitted:", { countryCode, phoneNumber });
    } else if (isPhoneNumberEntered && verificationCode) {
      setIsVerified(true);
      setCurrentStep(3);
      console.log("Verification Code Submitted:", { verificationCode });
    }
  };

  const handlePrivacyMessageClose = () => {
    setShowPrivacyMessage(false);
  };

  const handleNextClick = () => {
    goToNextStep();
  };

  return (
    <div>
      <ProgressBar currentStep={currentStep} />

      <h2>Registration</h2>
      <p>Fill in the registration data. It will take a couple of minutes. All you need is a phone number and email.</p>

      {showPrivacyMessage && <PrivacyMessage onClose={handlePrivacyMessageClose} />}

      <form onSubmit={handleSubmit}>
        <div className="phone-number-input">
          <select value={countryCode} onChange={handleCountryCodeChange} disabled={isVerified}>
            <option value="+1">+1 (US)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+91">+91 (IN)</option>
            <option value="+49">+49 (DE)</option>
          </select>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Phone number"
            required
            disabled={isVerified}
          />
        </div>

        {isPhoneNumberEntered && !isVerified && (
          <div>
            <h2>Enter the verification code</h2>
            <input
              type="text"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              placeholder="Verification code"
              required
            />
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!resendEnabled}
              className="resend-btn"
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend code'}
            </button>
            <p className="confirmation-message">Confirm phone number with code from SMS message.</p>
          </div>
        )}

        {!isVerified && (
          <button type="submit">{!isPhoneNumberEntered ? 'Next' : 'Verify'}</button>
        )}
      </form>

      {isVerified && (
        <div className="email-password-form-container">
          <h2>Enter your email and password</h2>
          <EmailPasswordForm goToNextStep={handleNextClick} />
        </div>
      )}

      {isVerified && !isPhoneNumberEntered && (
        <button onClick={handleNextClick}>Next</button>
      )}
    </div>
  );
};

export default PhoneNumberForm;
