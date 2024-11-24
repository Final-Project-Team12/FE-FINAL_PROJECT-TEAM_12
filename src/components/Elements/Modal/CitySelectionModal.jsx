import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const CitySelectionModal = ({ isOpen, onClose, onSelect, title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const recentCities = ['Jakarta', 'Bandung', 'Surabaya'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div
        className="bg-white w-full max-w-xl rounded-2xl overflow-hidden relative transform transition-all duration-300 ease-out"
        style={{
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        <div className="p-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 flex items-center border rounded-lg p-2">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Masukkan Kota atau Negara"
                className="ml-2 flex-1 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Pencarian terkini</h3>
              <button className="text-red-500 text-sm">Hapus</button>
            </div>

            <div className="space-y-4">
              {recentCities.map((city) => (
                <div
                  key={city}
                  className="flex items-center justify-between p-2 border-b"
                  onClick={() => {
                    onSelect(city);
                    onClose();
                  }}
                >
                  <span>{city}</span>
                  <X className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelectionModal;
