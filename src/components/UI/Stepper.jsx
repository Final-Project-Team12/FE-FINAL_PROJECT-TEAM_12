import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Stepper = ({ currentStep = 1 }) => {
  const steps = [
    { label: 'Isi Data Diri', step: 1 },
    { label: 'Bayar', step: 2 },
    { label: 'Selesai', step: 3 },
  ];

  return (
    <div className="p-2 sm:p-3 md:p-4">
      <div className="flex items-center justify-between sm:justify-start sm:gap-3 w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <div className="flex items-center">
              <span
                className={`font-semibold text-sm sm:text-base md:text-lg lg:text-xl
                  ${currentStep >= step.step ? 'text-black' : 'text-gray-400'}`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <MdOutlineKeyboardArrowRight
                  className={`ml-1 sm:ml-2 md:ml-3
                    w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 
                    text-gray-400`}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
