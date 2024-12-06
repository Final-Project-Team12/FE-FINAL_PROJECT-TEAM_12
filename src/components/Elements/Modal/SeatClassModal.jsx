import React from 'react';
import { Check, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const SeatClassModal = ({
  isOpen,
  onClose,
  onSelect,
  selectedClass = 'Economy',
}) => {
  const seatPrices = useSelector((state) => state.flightSearch.seatPrices);

  if (!isOpen) return null;

  const seatClasses = [
    { name: 'Economy', price: seatPrices.Economy },
    { name: 'Premium Economy', price: seatPrices['Premium Economy'] },
    { name: 'Business', price: seatPrices.Business },
    { name: 'First Class', price: seatPrices['First Class'] },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[360px] relative animate-[slideUp_0.2s_ease-out]">
        <div className="px-4 pt-4 pb-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4">
          {seatClasses.map((seatClass) => (
            <div
              key={seatClass.name}
              onClick={() => onSelect(seatClass.name)}
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
                      IDR {seatClass.price.toLocaleString('id-ID')}
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
