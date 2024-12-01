import React from 'react';

const ToggleSwitch = ({ isChecked, onChange, label }) => {
  return (
    <div className="flex items-center justify-between">
      <label className="text-[#7126B5] font-semibold">{label}</label>
      <label className="relative inline-block w-12 h-6 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="absolute w-12 h-6 bg-gray-300 peer-checked:bg-[#7126B5] rounded-full transition-all duration-300">
          <div
            className={`absolute w-5 h-5 bg-white rounded-full left-0.5 bottom-0.5 transition-all duration-300 ${
              isChecked ? 'translate-x-6' : 'translate-x-0'
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
