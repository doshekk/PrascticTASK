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

  // Стейти для повідомлень про помилки
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

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

  useEffect(() => {
    if (isPhoneNumberEntered && !isVerified) {
      // Для демонстрації: виводимо код підтвердження
      alert('Verification code: 1234');
    }
  }, [isPhoneNumberEntered, isVerified]);

  const handlePhoneNumberChange = (e) => {
    if (!isVerified) {
      setPhoneNumber(e.target.value);
      if (phoneNumberError) {
        setPhoneNumberError('');
      }
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
    if (verificationCodeError) {
      setVerificationCodeError('');
    }
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Якщо ще не введено номер телефону - перевіряємо його
    if (!isPhoneNumberEntered) {
      if (!phoneNumber) {
        setPhoneNumberError("Введіть номер телефону.");
        return;
      }
      // Простий валідатор: перевіряємо, що номер містить мінімум 10 цифр
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        setPhoneNumberError("Некоректний номер телефону. Має бути не менше 10 цифр.");
        return;
      }
      // Якщо номер валідний - очищаємо повідомлення про помилку та переходимо до наступного кроку
      setPhoneNumberError('');
      setIsPhoneNumberEntered(true);
      setCurrentStep(2);
      console.log("Phone Number Submitted:", { countryCode, phoneNumber });
    }
    // Після введення номера телефону перевіряємо код підтвердження
    else if (!isVerified) {
      if (!verificationCode) {
        setVerificationCodeError("Введіть код підтвердження.");
        return;
      }
      if (verificationCode !== "1234") {
        setVerificationCodeError("Невірний код підтвердження.");
        return;
      }
      setVerificationCodeError('');
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

      <h2>Реєстрація</h2>
      <p>Заповніть дані для реєстрації. Це займе кілька хвилин. Все, що вам потрібно — це номер телефону та email.</p>

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
            placeholder="Номер телефону"
            required
            disabled={isVerified}
          />
        </div>
        {phoneNumberError && <div className="error" style={{ color: 'red' }}>{phoneNumberError}</div>}

        {isPhoneNumberEntered && !isVerified && (
          <div>
            <h2>Введіть код підтвердження</h2>
            <input
              type="text"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              placeholder="Код підтвердження"
              required
            />
            {verificationCodeError && <div className="error" style={{ color: 'red' }}>{verificationCodeError}</div>}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!resendEnabled}
              className="resend-btn"
            >
              {timer > 0 ? `Відправити повторно через ${timer}s` : 'Відправити код повторно'}
            </button>
            <p className="confirmation-message">Підтвердіть номер телефону за допомогою коду, отриманого в SMS.</p>
          </div>
        )}
        
        {!isVerified && (
          <button type="submit">{!isPhoneNumberEntered ? 'Далі' : 'Підтвердити'}</button>
        )}
      </form>

      {isVerified && (
        <div className="email-password-form-container">
          <h2>Введіть вашу електронну адресу та пароль</h2>
          <EmailPasswordForm goToNextStep={handleNextClick} />
        </div>
      )}

      {isVerified && !isPhoneNumberEntered && (
        <button onClick={handleNextClick}>Далі</button>
      )}
    </div>
  );
};

export default PhoneNumberForm;
