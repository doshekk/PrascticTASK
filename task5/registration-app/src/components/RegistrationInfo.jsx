import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // Assuming the ProgressBar component is imported

const RegistrationInfo = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      <ProgressBar currentStep={currentStep} />
      
      {currentStep === 1 && (
        <div>
          <h2>Step 1: Phone Number</h2>
          {/* Insert PhoneNumberForm here */}
          <button onClick={goToNextStep}>Next</button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2>Step 2: Email & Password</h2>
          {/* Insert EmailPasswordForm here */}
          <button onClick={goToNextStep}>Next</button>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2>Step 3: Profile Information</h2>
          {/* Insert ProfileInfoForm here */}
          <button onClick={goToNextStep}>Finish</button>
        </div>
      )}
    </div>
  );
};

export default RegistrationInfo;
