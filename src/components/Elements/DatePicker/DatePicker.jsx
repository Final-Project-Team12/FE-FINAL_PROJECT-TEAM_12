import React from 'react';

const DatePicker = ({ value, onChange, label, className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-[#7126B5] font-semibold mb-2">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5] cursor-pointer"
      />
    </div>
  );
};

export default DatePicker;
