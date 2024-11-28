import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Stepper = ({ currentStep = 1 }) => {
  const steps = [
    { label: 'Isi Data Diri', step: 1 },
    { label: 'Bayar', step: 2 },
    { label: 'Selesai', step: 3 },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 text-base">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <span
              className={`font-semibold text-xl 
                ${currentStep >= step.step ? 'text-black' : 'text-gray-400'}`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <MdOutlineKeyboardArrowRight
                size={24}
                className="text-gray-400"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
