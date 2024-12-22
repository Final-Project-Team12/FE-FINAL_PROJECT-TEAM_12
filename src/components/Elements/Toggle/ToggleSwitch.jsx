import React from 'react';

const ToggleSwitch = ({ isChecked, onChange, label }) => {
  const handleToggle = () => {
    const event = {
      target: {
        checked: !isChecked,
      },
    };
    onChange(event);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-[#7126B5] font-semibold">{label}</span>
      <button
        type="button"
        onClick={handleToggle}
        className="relative inline-block w-12 h-6 cursor-pointer"
        aria-pressed={isChecked}
      >
        <div
          className={`absolute w-12 h-6 ${isChecked ? 'bg-[#7126B5]' : 'bg-gray-300'} rounded-full transition-colors duration-300`}
        >
          <div
            className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300 ${
              isChecked ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          ></div>
        </div>
      </button>
    </div>
  );
};

export default ToggleSwitch;
