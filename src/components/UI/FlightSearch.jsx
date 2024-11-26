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
import { useFlightSearch } from '../../hooks/useFlightSearch';
import { Switch } from '@headlessui/react';

const FlightSearch = () => {
  const {
    fromCity,
    toCity,
    departureDate,
    returnDate,
    passengerCounts,
    selectedSeatClass,
    isRoundTrip,
    isFromModalOpen,
    isToModalOpen,
    isDepartureDateModalOpen,
    isReturnDateModalOpen,
    isPassengerSelectorOpen,
    isSeatClassModalOpen,
    setFromCity,
    setToCity,
    setDepartureDate,
    setReturnDate,
    setPassengerCounts,
    setSelectedSeatClass,
    setIsRoundTrip,
    setIsFromModalOpen,
    setIsToModalOpen,
    setIsDepartureDateModalOpen,
    setIsReturnDateModalOpen,
    setIsPassengerSelectorOpen,
    setIsSeatClassModalOpen,
    formatDate,
    handleSwapCities,
    getTotalPassengers,
  } = useFlightSearch();

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
              {/* From and To Section */}
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
                      placeholder="Jakarta (JKTA)"
                      className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b cursor-pointer"
                      readOnly
                    />
                  </div>
                </div>

                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={handleSwapCities}
                    className="bg-black rounded-full p-1.5 mx-4 hover:bg-gray-800 transition-colors"
                  >
                    <ArrowLeftRight size={16} className="text-white" />
                  </button>
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
                      placeholder="Bandung (BDG)"
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

                  {/* Return Date with Toggle */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-500 text-xs">Return</span>
                      <Switch
                        checked={isRoundTrip}
                        onChange={setIsRoundTrip}
                        className={`${
                          isRoundTrip ? 'bg-purple-600' : 'bg-gray-200'
                        } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
                      >
                        <span
                          className={`${
                            isRoundTrip ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                    <div
                      className={`relative flex items-center cursor-pointer ${
                        !isRoundTrip && 'opacity-50'
                      }`}
                      onClick={() =>
                        isRoundTrip && setIsReturnDateModalOpen(true)
                      }
                    >
                      <div className="flex items-center px-3">
                        <MdDateRange size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={
                          isRoundTrip ? formatDate(returnDate) : 'Pilih Tanggal'
                        }
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b cursor-pointer"
                        readOnly
                        disabled={!isRoundTrip}
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers and Seat Class */}
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
                        value={getTotalPassengers()}
                        className="flex-1 py-2 text-sm md:text-base focus:outline-none focus:border-purple-600 border-b cursor-pointer"
                        readOnly
                        onClick={() => setIsPassengerSelectorOpen(true)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs mb-1">Seat Class</div>
                    <input
                      type="text"
                      value={selectedSeatClass}
                      className="w-full py-2 border-b text-sm md:text-base focus:outline-none focus:border-purple-600 cursor-pointer"
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

      <PassengerSelector
        isOpen={isPassengerSelectorOpen}
        onClose={() => setIsPassengerSelectorOpen(false)}
        passengerCounts={passengerCounts}
        onUpdatePassengers={setPassengerCounts}
      />
    </>
  );
};

export default FlightSearch;
