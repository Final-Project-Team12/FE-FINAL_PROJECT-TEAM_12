import React, { useState } from 'react';
import { ArrowUpDown, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSortCriteria,
  fetchFilteredFlights,
} from '../../store/slices/flightFilterSlice';

const SortTicket = () => {
  const dispatch = useDispatch();
  const { sortCriteria, activeFilters } = useSelector(
    (state) => state.flightFilter
  );
  const {
    fromCity,
    toCity,
    departureDate,
    returnDate,
    selectedSeatClass,
    passengerCounts,
    isRoundTrip,
    selectedDepartureFlight,
  } = useSelector((state) => state.flightSearch);

  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(() => {
    const mapping = {
      price_asc: 'termurah',
      price_desc: 'termahal',
      duration_asc: 'terpendek',
      duration_desc: 'terpanjang',
      departure_asc: 'awal',
      departure_desc: 'akhir',
      arrival_asc: 'kedatanganAwal',
      arrival_desc: 'kedatanganAkhir',
    };
    return mapping[sortCriteria] || 'termurah';
  });

  const filterOptions = [
    { value: 'termurah', label: 'Harga - Termurah', sortKey: 'price_asc' },
    { value: 'termahal', label: 'Harga - Termahal', sortKey: 'price_desc' },
    {
      value: 'terpendek',
      label: 'Durasi - Terpendek',
      sortKey: 'duration_asc',
    },
    {
      value: 'terpanjang',
      label: 'Durasi - Terpanjang',
      sortKey: 'duration_desc',
    },
    {
      value: 'awal',
      label: 'Keberangkatan - Paling Awal',
      sortKey: 'departure_asc',
    },
    {
      value: 'akhir',
      label: 'Keberangkatan - Paling Akhir',
      sortKey: 'departure_desc',
    },
    {
      value: 'kedatanganAwal',
      label: 'Kedatangan - Paling Awal',
      sortKey: 'arrival_asc',
    },
    {
      value: 'kedatanganAkhir',
      label: 'Kedatangan - Paling Akhir',
      sortKey: 'arrival_desc',
    },
  ];

  const toggleModal = () => setShowModal(!showModal);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const formatApiDate = (date) => {
    if (!date) return '';
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return '';

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const applySort = (sortKey) => {
    dispatch(setSortCriteria(sortKey));

    const searchPayload = {
      from: fromCity,
      to: toCity,
      departureDate: formatApiDate(departureDate),
      seatClass: selectedSeatClass,
      passengerAdult: passengerCounts.adult || 0,
      passengerChild: passengerCounts.child || 0,
      passengerInfant: passengerCounts.infant || 0,
      ...(selectedDepartureFlight &&
        returnDate && {
          returnDate: formatApiDate(returnDate),
        }),
    };

    dispatch(
      fetchFilteredFlights({
        page: 1,
        filters: activeFilters,
        searchParams: searchPayload,
      })
    );
  };

  const applyFilter = () => {
    const selectedOption = filterOptions.find(
      (option) => option.value === selectedFilter
    );
    if (selectedOption) {
      applySort(selectedOption.sortKey);
    }
    setShowModal(false);
  };

  const selectedLabel = filterOptions.find(
    (filter) => filter.value === selectedFilter
  )?.label;

  const displayText = selectedLabel?.split(' - ')[1] || 'Termurah';

  return (
    <div className="ml-[260px] my-8 relative flex justify-center">
      <button
        className="flex absolute right-0 items-center gap-0.5 text-purple-600 py-1 px-3 rounded-3xl border border-purple-600 hover:bg-purple-600 hover:text-white transition-colors text-xs group"
        onClick={toggleModal}
      >
        <ArrowUpDown
          size={16}
          className="text-purple-600 group-hover:text-white transition-colors"
        />
        <i className="fa fa-filter"></i> {displayText}
      </button>

      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>

          <div className="absolute right-0 z-50 pt-8">
            <div className="bg-white rounded-2xl w-[280px] md:w-[360px] relative animate-[slideUp_0.2s_ease-out]">
              <div className="px-4 pt-4 pb-6 border-b border-gray-200">
                <button
                  onClick={toggleModal}
                  className="absolute right-1 top-4 text-gray-500 hover:text-gray-700 z-10"
                >
                  <X size={20} />
                </button>
                <h3 className="text-xl font-semibold text-[#4B1979]">
                  Urutkan Berdasarkan
                </h3>
              </div>

              <div className="px-4">
                {filterOptions.map((filter) => (
                  <div
                    key={filter.value}
                    onClick={() => handleFilterChange(filter.value)}
                    className="cursor-pointer relative border-b border-gray-200"
                  >
                    <div
                      className={`py-3 transition-colors ${
                        selectedFilter === filter.value
                          ? 'bg-[#4B1979] -mx-4 px-4'
                          : 'hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3
                            className={`text-base font-semibold ${
                              selectedFilter === filter.value
                                ? 'text-white'
                                : 'text-black'
                            }`}
                          >
                            {filter.label}
                          </h3>
                        </div>
                        {selectedFilter === filter.value && (
                          <div className="bg-green-400 rounded-full p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="white"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 4.293a1 1 0 010 1.414L8.414 14l-4-4a1 1 0 111.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 flex justify-end border-t border-gray-200">
                <button
                  onClick={applyFilter}
                  className="bg-[#4B1979] text-white px-8 py-2 rounded-full text-base font-medium hover:bg-[#3a1161] transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SortTicket;
