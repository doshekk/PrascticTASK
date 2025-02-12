import React, { useState } from 'react';
import './styles.css';
import TopBar from './components/TopBar';  // Import the TopBar component
import StepBar from './components/StepBar';
import PhoneNumberForm from './components/PhoneNumberForm';
import ProfileInfoForm from './components/ProfileInfoForm';
import ContactInfoForm from './components/ContactInfoForm';
import AddressForm from './components/AddressForm';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleClose = () => {
    console.log("Close button clicked");
    // You can implement logic here to close the registration, redirect, or do other actions
  };

  const goToNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const goToPrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="container">
      <div className="registration-box">
        
        {/* Add the TopBar at the top of the registration-box */}
        <TopBar onClose={handleClose} />

        {currentStep > 1 && currentStep < 5 && (
          <StepBar currentStep={currentStep} />
        )}
        {currentStep === 1 && (
          <PhoneNumberForm
            setCurrentStep={setCurrentStep}
            goToNextStep={goToNextStep}
          />
        )}
        {currentStep === 2 && (
          <ProfileInfoForm goToNextStep={goToNextStep} />
        )}
        {currentStep === 3 && (
          <ContactInfoForm goToNextStep={goToNextStep} />
        )}
        {currentStep === 4 && (
          <AddressForm goToNextStep={goToNextStep} />
        )}
        
        {currentStep > 1 && <button onClick={goToPrevStep}>Back</button>}
      </div>
    </div>
  );
};

export default App;
