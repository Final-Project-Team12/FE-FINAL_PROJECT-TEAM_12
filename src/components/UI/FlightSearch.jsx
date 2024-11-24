import React, { useState } from 'react';
import { ArrowLeftRight, Search, X } from 'lucide-react';
import {
  MdFlightTakeoff,
  MdDateRange,
  MdOutlineAirlineSeatReclineNormal,
} from 'react-icons/md';

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
          <div className="flex items-center border rounded-lg p-2 mb-6">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Masukkan Kota atau Negara"
              className="ml-2 flex-1 outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-400" />
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
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
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

const FlightSearch = () => {
  const [fromCity, setFromCity] = useState('Jakarta (JKTA)');
  const [toCity, setToCity] = useState('Melbourne (MLB)');
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);

  return (
    <>
      <div className="relative -mt-20 z-20">
        <div className="bg-white max-w-6xl mx-auto rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
              Pilih Jadwal Penerbangan spesial di{' '}
              <span className="text-purple-600">Tiketku!</span>
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center relative">
                <div>
                  <div className="text-gray-500 text-xs mb-1">From</div>
                  <div
                    className="relative flex items-center cursor-pointer"
                    onClick={() => setIsFromModalOpen(true)}
                  >
                    <div className="flex items-center px-3">
                      <MdFlightTakeoff size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={fromCity}
                      className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b cursor-pointer"
                      readOnly
                    />
                  </div>
                </div>

                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="bg-black rounded-full p-1.5 mx-4">
                    <ArrowLeftRight size={16} className="text-white" />
                  </div>
                </div>

                <div>
                  <div className="text-gray-500 text-xs mb-1">To</div>
                  <div
                    className="relative flex items-center cursor-pointer"
                    onClick={() => setIsToModalOpen(true)}
                  >
                    <div className="flex items-center px-3">
                      <MdFlightTakeoff size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={toCity}
                      className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b cursor-pointer"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Date and Passengers Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Departure</div>
                    <div className="relative flex items-center">
                      <div className="flex items-center px-3">
                        <MdDateRange size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value="1 Maret 2023"
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs mb-1">Return</div>
                    <div className="relative flex items-center">
                      <div className="flex items-center px-3">
                        <MdDateRange size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Pilih Tanggal"
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b placeholder-purple-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Passengers</div>
                    <div className="relative flex items-center">
                      <div className="flex items-center px-3">
                        <MdOutlineAirlineSeatReclineNormal
                          size={20}
                          className="text-gray-400"
                        />
                      </div>
                      <input
                        type="text"
                        value="2 Penumpang"
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs mb-1">Seat Class</div>
                    <input
                      type="text"
                      value="Business"
                      className="w-full py-2 border-b text-sm md:text-base focus:outline-none focus:border-purple-600"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-purple-600 text-white py-4 md:py-3 rounded-b-2xl font-medium hover:bg-purple-700 transition-colors text-sm md:text-base">
            Cari Penerbangan
          </button>
        </div>
      </div>

      <CitySelectionModal
        isOpen={isFromModalOpen}
        onClose={() => setIsFromModalOpen(false)}
        onSelect={(city) =>
          setFromCity(`${city} (${city.substring(0, 4).toUpperCase()})`)
        }
        title="From"
      />

      <CitySelectionModal
        isOpen={isToModalOpen}
        onClose={() => setIsToModalOpen(false)}
        onSelect={(city) =>
          setToCity(`${city} (${city.substring(0, 4).toUpperCase()})`)
        }
        title="To"
      />

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default FlightSearch;
