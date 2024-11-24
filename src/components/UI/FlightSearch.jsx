import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import {
  MdFlightTakeoff,
  MdDateRange,
  MdOutlineAirlineSeatReclineNormal,
} from 'react-icons/md';
import CitySelectionModal from '../Elements/Modal/CitySelectionModal';
import DatePickerModal from '../Elements/Modal/DatePickerModal';
import PassengerSelector from '../Elements/Modal/PassengerSelector';
import SeatClassModal from '../Elements/Modal/SeatClassModal';

const FlightSearch = () => {
  const [fromCity, setFromCity] = useState('Jakarta (JKTA)');
  const [toCity, setToCity] = useState('Melbourne (MLB)');
  const [departureDate, setDepartureDate] = useState(new Date('2023-03-01'));
  const [returnDate, setReturnDate] = useState(null);
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [isDepartureDateModalOpen, setIsDepartureDateModalOpen] =
    useState(false);
  const [isReturnDateModalOpen, setIsReturnDateModalOpen] = useState(false);
  const [isPassengerSelectorOpen, setIsPassengerSelectorOpen] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 2,
    child: 0,
    infant: 1,
  });
  const [isSeatClassModalOpen, setIsSeatClassModalOpen] = useState(false);
  const [selectedSeatClass, setSelectedSeatClass] = useState('Business');

  const formatDate = (date) => {
    if (!date) return '';
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSwapCities = () => {
    const tempFrom = fromCity;
    setFromCity(toCity);
    setToCity(tempFrom);
  };

  const getTotalPassengers = () => {
    const total =
      passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
    return `${total} Penumpang`;
  };

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
              {/* City Selection Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center relative">
                {/* From City */}
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

                {/* Swap Button */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={handleSwapCities}
                    className="bg-black rounded-full p-1.5 mx-4 hover:bg-gray-800 transition-colors"
                  >
                    <ArrowLeftRight size={16} className="text-white" />
                  </button>
                </div>

                {/* To City */}
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
                  {/* Departure Date */}
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Departure</div>
                    <div
                      className="relative flex items-center cursor-pointer"
                      onClick={() => setIsDepartureDateModalOpen(true)}
                    >
                      <div className="flex items-center px-3">
                        <MdDateRange size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formatDate(departureDate)}
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b cursor-pointer"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Return Date */}
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Return</div>
                    <div
                      className="relative flex items-center cursor-pointer"
                      onClick={() => setIsReturnDateModalOpen(true)}
                    >
                      <div className="flex items-center px-3">
                        <MdDateRange size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formatDate(returnDate)}
                        placeholder="Pilih Tanggal"
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b placeholder-purple-600 cursor-pointer"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers and Seat Class */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Passengers */}
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
                        value={getTotalPassengers()}
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b cursor-pointer"
                        readOnly
                        onClick={() =>
                          setIsPassengerSelectorOpen(!isPassengerSelectorOpen)
                        }
                      />
                      <PassengerSelector
                        isOpen={isPassengerSelectorOpen}
                        onClose={() => setIsPassengerSelectorOpen(false)}
                        passengerCounts={passengerCounts}
                        onUpdatePassengers={setPassengerCounts}
                      />
                    </div>
                  </div>

                  {/* Seat Class */}
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Seat Class</div>
                    <input
                      type="text"
                      value={selectedSeatClass}
                      className="w-full py-2 border-b text-sm md:text-base focus:outline-none focus:border-purple-600"
                      readOnly
                      onClick={() => setIsSeatClassModalOpen(true)}
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

      {/* Modals */}
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

      <DatePickerModal
        isOpen={isDepartureDateModalOpen}
        onClose={() => setIsDepartureDateModalOpen(false)}
        onSelect={(date) => {
          setDepartureDate(date);
          setIsDepartureDateModalOpen(false);
        }}
        selectedDate={departureDate}
        title="Select Departure Date"
      />

      <DatePickerModal
        isOpen={isReturnDateModalOpen}
        onClose={() => setIsReturnDateModalOpen(false)}
        onSelect={(date) => {
          setReturnDate(date);
          setIsReturnDateModalOpen(false);
        }}
        selectedDate={returnDate}
        title="Select Return Date"
      />

      <SeatClassModal
        isOpen={isSeatClassModalOpen}
        onClose={() => setIsSeatClassModalOpen(false)}
        onSelect={setSelectedSeatClass}
        selectedClass={selectedSeatClass}
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
