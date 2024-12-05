import { ArrowLeftRight } from 'lucide-react';
import {
  MdFlightTakeoff,
  MdDateRange,
  MdOutlineAirlineSeatReclineNormal,
} from 'react-icons/md';
import { Switch } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import CitySelectionModal from '../Elements/Modal/CitySelectionModal';
import DatePickerModal from '../Elements/Modal/DatePickerModal';
import PassengerSelector from '../Elements/Modal/PassengerSelector';
import SeatClassModal from '../Elements/Modal/SeatClassModal';
import { useFlightSearch } from '../../hooks/useFlightSearch';

const FlightSearch = () => {
  const navigate = useNavigate();
  const {
    fromCity,
    toCity,
    departureDate,
    returnDate,
    isRoundTrip,
    passengerCounts,
    selectedSeatClass,
    isFromModalOpen,
    isToModalOpen,
    isDepartureDateModalOpen,
    isReturnDateModalOpen,
    isPassengerSelectorOpen,
    isSeatClassModalOpen,
    setDepartureDate,
    setReturnDate,
    setIsRoundTrip,
    setPassengerCounts,
    setSelectedSeatClass,
    setIsFromModalOpen,
    setIsToModalOpen,
    setIsDepartureDateModalOpen,
    setIsReturnDateModalOpen,
    setIsPassengerSelectorOpen,
    setIsSeatClassModalOpen,
    handleFromCitySelection,
    handleToCitySelection,
    handleSwapCities,
    formatDate,
    getTotalPassengers,
    setFlightSearchData,
  } = useFlightSearch();

  const handleSearch = (e) => {
    e.preventDefault();

    if (
      !fromCity ||
      !toCity ||
      !departureDate ||
      (isRoundTrip && !returnDate)
    ) {
      alert('Mohon lengkapi data pencarian penerbangan');
      return;
    }

    navigate('/flight-ticket');
  };

  return (
    <>
      <div className="relative -mt-16 sm:-mt-18 md:-mt-20 z-20 px-4 sm:px-6 md:px-0">
        <div className="bg-white w-full max-w-[360px] sm:max-w-[640px] md:max-w-6xl mx-auto rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <form onSubmit={handleSearch}>
            <div className="p-3 sm:p-4 md:p-6">
              <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6">
                Pilih Jadwal Penerbangan spesial di{' '}
                <span className="text-[#7126B5]">Tiketku!</span>
              </h2>

              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {/* From-To Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8 items-start md:items-center relative">
                  {/* From Field */}
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="text-gray-500 text-[10px] sm:text-xs mb-1">
                        From
                      </div>
                      <div className="relative flex items-center">
                        <div className="flex items-center px-2 sm:px-3">
                          <MdFlightTakeoff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={fromCity}
                          readOnly
                          placeholder="Jakarta (JKTA)"
                          className="flex-1 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:border-[#7126B5] border-b cursor-pointer"
                          onClick={() => setIsFromModalOpen(true)}
                        />
                      </div>
                    </div>

                    {/* Mobile Swap Button */}
                    <div className="md:hidden pt-6">
                      <button
                        type="button"
                        onClick={handleSwapCities}
                        className="bg-black rounded-full p-1.5 hover:bg-gray-800 transition-colors"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Swap Button */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button
                      type="button"
                      onClick={handleSwapCities}
                      className="bg-black rounded-full p-1.5 mx-4 hover:bg-gray-800 transition-colors"
                    >
                      <ArrowLeftRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* To Field */}
                  <div>
                    <div className="text-gray-500 text-[10px] sm:text-xs mb-1">
                      To
                    </div>
                    <div className="relative flex items-center">
                      <div className="flex items-center px-2 sm:px-3">
                        <MdFlightTakeoff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={toCity}
                        readOnly
                        placeholder="Bandung (BDG)"
                        className="flex-1 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:border-[#7126B5] border-b cursor-pointer"
                        onClick={() => setIsToModalOpen(true)}
                      />
                    </div>
                  </div>
                </div>

                {/* Dates and Passengers Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
                  {/* Dates Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Departure Date */}
                    <div>
                      <div className="text-gray-500 text-[10px] sm:text-xs mb-1">
                        Departure
                      </div>
                      <div className="relative flex items-center">
                        <div className="flex items-center px-2 sm:px-3">
                          <MdDateRange className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formatDate(departureDate)}
                          readOnly
                          className="flex-1 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:border-[#7126B5] border-b cursor-pointer"
                          onClick={() => setIsDepartureDateModalOpen(true)}
                        />
                      </div>
                    </div>

                    {/* Return Date */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-500 text-[10px] sm:text-xs">
                          Return
                        </span>
                        <Switch
                          checked={isRoundTrip}
                          onChange={setIsRoundTrip}
                          className={`${
                            isRoundTrip ? 'bg-[#7126B5]' : 'bg-gray-200'
                          } relative inline-flex h-4 sm:h-5 w-8 sm:w-10 items-center rounded-full transition-colors focus:outline-none`}
                        >
                          <span
                            className={`${
                              isRoundTrip
                                ? 'translate-x-4 sm:translate-x-6'
                                : 'translate-x-1'
                            } inline-block h-2 sm:h-3 w-2 sm:w-3 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
                      <div className="relative flex items-center">
                        <div className="flex items-center px-2 sm:px-3">
                          <MdDateRange className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={
                            isRoundTrip
                              ? formatDate(returnDate)
                              : 'Pilih Tanggal'
                          }
                          readOnly
                          className={`flex-1 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:border-[#7126B5] border-b cursor-pointer ${
                            !isRoundTrip && 'opacity-50'
                          }`}
                          onClick={() =>
                            isRoundTrip && setIsReturnDateModalOpen(true)
                          }
                          disabled={!isRoundTrip}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Passengers and Seat Class */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Passengers */}
                    <div>
                      <div className="text-gray-500 text-[10px] sm:text-xs mb-1">
                        Passengers
                      </div>
                      <div className="relative flex items-center">
                        <div className="flex items-center px-2 sm:px-3">
                          <MdOutlineAirlineSeatReclineNormal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={getTotalPassengers()}
                          readOnly
                          className="flex-1 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:border-[#7126B5] border-b cursor-pointer"
                          onClick={() => setIsPassengerSelectorOpen(true)}
                        />
                      </div>
                    </div>

                    {/* Seat Class */}
                    <div>
                      <div className="text-gray-500 text-[10px] sm:text-xs mb-1">
                        Seat Class
                      </div>
                      <input
                        type="text"
                        value={selectedSeatClass}
                        readOnly
                        className="w-full py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border-b focus:outline-none focus:border-[#7126B5] cursor-pointer"
                        onClick={() => setIsSeatClassModalOpen(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7126B5] text-white py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm md:text-base rounded-b-xl sm:rounded-b-2xl font-medium hover:bg-[#7126B5] transition-colors"
            >
              Cari Penerbangan
            </button>
          </form>
        </div>
      </div>

      {/* Modals */}
      <CitySelectionModal
        isOpen={isFromModalOpen}
        onClose={() => setIsFromModalOpen(false)}
        onSelect={handleFromCitySelection}
        title="From"
      />

      <CitySelectionModal
        isOpen={isToModalOpen}
        onClose={() => setIsToModalOpen(false)}
        onSelect={handleToCitySelection}
        title="To"
      />

      <DatePickerModal
        isOpen={isDepartureDateModalOpen}
        onClose={() => setIsDepartureDateModalOpen(false)}
        onSelect={(date) => {
          setDepartureDate(date);
          // Update return date if needed
          if (isRoundTrip && returnDate < date) {
            setReturnDate(date);
          }
          setIsDepartureDateModalOpen(false);
        }}
        selectedDate={departureDate}
        title="Select Departure Date"
        minDate={new Date()} // Prevent selecting past dates
      />

      <DatePickerModal
        isOpen={isReturnDateModalOpen}
        onClose={() => setIsReturnDateModalOpen(false)}
        onSelect={(date) => {
          if (date >= departureDate) {
            setReturnDate(date);
            setIsReturnDateModalOpen(false);
          } else {
            alert(
              'Tanggal kembali tidak boleh lebih awal dari tanggal berangkat'
            );
          }
        }}
        selectedDate={returnDate}
        title="Select Return Date"
        minDate={departureDate} // Prevent selecting dates before departure
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
