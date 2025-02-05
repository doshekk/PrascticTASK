const StepBar = ({ currentStep }) => {
  return (
    <div className="step-bar">
      {[2, 3, 4].map((step) => (
        <div
          key={step}
          className={`step ${currentStep >= step++ ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default StepBar;
