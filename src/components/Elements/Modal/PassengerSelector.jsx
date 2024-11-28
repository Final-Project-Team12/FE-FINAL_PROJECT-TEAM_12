import React from 'react';
import { X } from 'lucide-react';
import ChildIcon from '../../../../public/icons/Child-Icon.svg';
import AdultIcon from '../../../../public/icons/Adult-icon.svg';
import BabyIcon from '../../../../public/icons/Baby-icon.svg';

const PassengerSelector = ({
  isOpen,
  onClose,
  passengerCounts,
  onUpdatePassengers,
}) => {
  if (!isOpen) return null;

  const handleIncrement = (type) => {
    onUpdatePassengers({
      ...passengerCounts,
      [type]: passengerCounts[type] + 1,
    });
  };

  const handleDecrement = (type) => {
    if (passengerCounts[type] > 0) {
      onUpdatePassengers({
        ...passengerCounts,
        [type]: passengerCounts[type] - 1,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-xl w-[90%] max-w-sm mx-4 overflow-hidden">
        <div className="pt-4 px-6 flex justify-end border-b pb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={AdultIcon} alt="Adult Icon" className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Dewasa</h3>
                  <p className="text-sm text-gray-400">(12 tahun keatas)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('adult')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <span className="text-xl font-medium">−</span>
                </button>
                <span className="w-8 text-center text-lg">
                  {passengerCounts.adult}
                </span>
                <button
                  onClick={() => handleIncrement('adult')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <span className="text-xl font-medium">+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={ChildIcon} alt="Child Icon" className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Anak</h3>
                  <p className="text-sm text-gray-400">(2 - 11 tahun)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('child')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <span className="text-xl font-medium">−</span>
                </button>
                <span className="w-8 text-center text-lg">
                  {passengerCounts.child}
                </span>
                <button
                  onClick={() => handleIncrement('child')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <span className="text-xl font-medium">+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={BabyIcon} alt="Baby Icon" className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Bayi</h3>
                  <p className="text-sm text-gray-400">(Dibawah 2 tahun)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('infant')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <span className="text-xl font-medium">−</span>
                </button>
                <span className="w-8 text-center text-lg">
                  {passengerCounts.infant}
                </span>
                <button
                  onClick={() => handleIncrement('infant')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <span className="text-xl font-medium">+</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="w-1/2 mt-8 bg-[#7126B5] text-white py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerSelector;
