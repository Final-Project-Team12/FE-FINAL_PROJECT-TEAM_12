import React from 'react';
import { Check, X } from 'lucide-react';

const SeatClassModal = ({
  isOpen,
  onClose,
  onSelect,
  selectedClass = 'Economy',
}) => {
  if (!isOpen) return null;

  const seatClasses = [
    { name: 'Economy', price: 'IDR 4.950.000' },
    { name: 'Premium Economy', price: 'IDR 7.550.000' },
    { name: 'Business', price: 'IDR 29.220.000' },
    { name: 'First Class', price: 'IDR 87.620.000' },
  ];

  const handleSelect = (seatClass) => {
    onSelect(seatClass);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[360px] relative animate-[slideUp_0.2s_ease-out]">
        <div className="px-4 pt-4 pb-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute right-3 top-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4">
          {seatClasses.map((seatClass) => (
            <div
              key={seatClass.name}
              onClick={() => handleSelect(seatClass.name)}
              className="cursor-pointer relative border-b border-gray-200"
            >
              <div
                className={`py-3 transition-colors ${
                  selectedClass === seatClass.name
                    ? 'bg-[#4B1979] -mx-4 px-4'
                    : 'hover:bg-purple-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className={`text-base font-semibold ${
                        selectedClass === seatClass.name
                          ? 'text-white'
                          : 'text-black'
                      }`}
                    >
                      {seatClass.name}
                    </h3>
                    <p
                      className={`text-base mt-0.5 ${
                        selectedClass === seatClass.name
                          ? 'text-white'
                          : 'text-[#4B1979]'
                      }`}
                    >
                      {seatClass.price}
                    </p>
                  </div>
                  {selectedClass === seatClass.name && (
                    <div className="bg-green-400 rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-[#4B1979] text-white px-8 py-2 rounded-full text-base font-medium hover:bg-[#3a1161] transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatClassModal;
