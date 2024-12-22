import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  setActiveFilters,
  fetchFilteredFlights,
  clearAllFilters,
} from '../../store/slices/flightFilterSlice';
import {
  updateFlightSearch,
  resetFlightSearch,
} from '../../store/slices/flightSearchSlice';

const HeaderTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const originalDepartureDate = useRef(null);
  const hasRestoredDate = useRef(false);

  const { activeFilters } = useSelector((state) => state.flightFilter);
  const {
    fromCity,
    toCity,
    fromCityDisplay,
    toCityDisplay,
    passengerCounts,
    selectedSeatClass,
    departureDate,
    returnDate,
    isRoundTrip,
    selectedDepartureFlight,
    lastSearchParams,
  } = useSelector((state) => state.flightSearch);

  const [visibleDateRange, setVisibleDateRange] = useState({
    start: -3,
    end: 3,
  });
  const [activeIndex, setActiveIndex] = useState(null);

  // Initial mount effect
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      if (lastSearchParams && !isRoundTrip && !hasRestoredDate.current) {
        originalDepartureDate.current = lastSearchParams.departureDate;
        hasRestoredDate.current = true;

        dispatch(
          updateFlightSearch({
            departureDate: new Date(lastSearchParams.departureDate),
          })
        );

        dispatch(
          fetchFilteredFlights({
            page: 1,
            filters: activeFilters,
            searchParams: lastSearchParams,
          })
        );
      } else {
        originalDepartureDate.current = departureDate;
      }
    }
  }, []);

  // Reset flag when navigating away
  useEffect(() => {
    return () => {
      hasRestoredDate.current = false;
    };
  }, []);

  const formatDay = (date) => {
    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
    return days[new Date(date).getDay()];
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatAPIDate = (date) => {
    if (!date) return '';
    try {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting API date:', error);
      return '';
    }
  };

  const getCurrentDate = () => {
    if (!isRoundTrip) {
      return hasRestoredDate.current
        ? new Date(departureDate)
        : new Date(originalDepartureDate.current || departureDate);
    }

    if (selectedDepartureFlight) {
      return new Date(returnDate);
    }

    return new Date(departureDate);
  };

  const dates = useMemo(() => {
    const baseDate = getCurrentDate();
    const datesArray = [];

    if (!baseDate || isNaN(baseDate.getTime())) {
      return [];
    }

    baseDate.setHours(0, 0, 0, 0);

    for (let i = visibleDateRange.start; i <= visibleDateRange.end; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      date.setHours(0, 0, 0, 0);

      datesArray.push({
        day: formatDay(date),
        date: formatDate(date),
        apiDate: formatAPIDate(date),
        fullDate: date,
        active: formatAPIDate(date) === formatAPIDate(baseDate),
        disabled: false,
      });
    }

    return datesArray;
  }, [
    visibleDateRange,
    departureDate,
    returnDate,
    selectedDepartureFlight,
    lastSearchParams,
    isRoundTrip,
  ]);

  useEffect(() => {
    const currentDate = getCurrentDate();
    if (!currentDate) return;

    const dateIndex = dates.findIndex(
      (d) => formatAPIDate(d.fullDate) === formatAPIDate(currentDate)
    );

    if (dateIndex !== -1) {
      setActiveIndex(dateIndex);
    }
  }, [
    departureDate,
    returnDate,
    selectedDepartureFlight,
    dates,
    lastSearchParams,
  ]);

  const handleDateFilter = async (selectedDate) => {
    if (!selectedDate) return;

    const searchPayload = {
      from: fromCity,
      to: toCity,
      seatClass: selectedSeatClass,
      passengerAdult: passengerCounts.adult || 0,
      passengerChild: passengerCounts.child || 0,
      passengerInfant: passengerCounts.infant || 0,
      isRoundTrip,
    };

    if (selectedDepartureFlight) {
      searchPayload.departureDate = formatAPIDate(departureDate);
      searchPayload.returnDate = formatAPIDate(selectedDate);

      dispatch(
        updateFlightSearch({
          returnDate: new Date(selectedDate),
        })
      );
    } else {
      searchPayload.departureDate = formatAPIDate(selectedDate);
      if (isRoundTrip && returnDate) {
        searchPayload.returnDate = formatAPIDate(returnDate);
      }

      // Allow updating the departure date after initial restore
      if (!isRoundTrip) {
        hasRestoredDate.current = true;
      }

      dispatch(
        updateFlightSearch({
          departureDate: new Date(selectedDate),
          lastSearchParams: {
            ...searchPayload,
            departureDate: selectedDate,
          },
        })
      );
    }

    const updatedFilters = {
      ...activeFilters,
      facilities: activeFilters.facilities || [],
      departureDate: null,
    };

    dispatch(setActiveFilters(updatedFilters));
    await dispatch(
      fetchFilteredFlights({
        page: 1,
        filters: updatedFilters,
        searchParams: searchPayload,
      })
    );
  };

  const handleDateClick = (index) => {
    if (dates[index].disabled) return;
    setActiveIndex(index);
    handleDateFilter(dates[index].apiDate);
  };

  const handlePrevDates = () => {
    setVisibleDateRange((prev) => ({
      start: prev.start - 7,
      end: prev.end - 7,
    }));
  };

  const handleNextDates = () => {
    setVisibleDateRange((prev) => ({
      start: prev.start + 7,
      end: prev.end + 7,
    }));
  };

  const handleReset = () => {
    dispatch(resetFlightSearch());
    dispatch(clearAllFilters());
    navigate('/');
  };

  const canShowPrevious = visibleDateRange.start > -30;
  const canShowNext = visibleDateRange.end < 90;

  const totalPassengers = Object.values(passengerCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const headerText = useMemo(() => {
    const from = !selectedDepartureFlight
      ? fromCityDisplay || fromCity
      : toCityDisplay || toCity;
    const to = !selectedDepartureFlight
      ? toCityDisplay || toCity
      : fromCityDisplay || fromCity;

    return `${from} → ${to} - ${totalPassengers} Penumpang - ${selectedSeatClass}`;
  }, [
    selectedDepartureFlight,
    fromCity,
    toCity,
    fromCityDisplay,
    toCityDisplay,
    totalPassengers,
    selectedSeatClass,
  ]);

  return (
    <div className="border-b shadow-[0px_4px_10px_rgba(0,0,0,0.1)] py-5">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <h2 className="text-xl font-bold mb-6">
          {selectedDepartureFlight
            ? 'Pilih Penerbangan Kembali'
            : 'Pilih Penerbangan'}
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div
              className="w-full sm:w-3/4 h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center cursor-pointer"
              onClick={handleReset}
            >
              <img
                src="/icons/fi_arrow-left.svg"
                alt="Back"
                className="w-6 h-6 ml-4 hover:scale-125 transition-all duration-200 text-white"
              />
              <div className="ml-3 text-xs font-medium text-white md:text-[16px]">
                {headerText}
              </div>
            </div>
            <button
              className="w-full text-sm  h-[50px] rounded-[12px] bg-[#73CA5C] font-bold text-white hover:bg-[#65b350] transition-colors md:font-[16px] md:w-1/4"
              onClick={handleReset}
            >
              Ubah Pencarian
            </button>
          </div>

          <div className="relative flex px-4 md:px-8">
            {canShowPrevious && (
              <button
                onClick={handlePrevDates}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 mx-1 md:mx-2"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </button>
            )}

            <div className="flex flex-1 overflow-hidden mx-2 md:mx-4">
              <div className="grid grid-cols-1 md:grid-cols-7 w-full gap-2 md:gap-1">
                {dates.map((dateInfo, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <div
                      onClick={() => handleDateClick(index)}
                      className={`flex flex-row md:flex-col items-center justify-between md:justify-center cursor-pointer transition-all duration-200 px-3 md:px-4 py-2 rounded-lg w-full mx-1 
                border md:border-0 border-purple-100 shadow-sm md:shadow-none
                ${
                  activeIndex === index
                    ? 'text-white bg-[#7126B5] border-[#7126B5]'
                    : dateInfo.active && activeIndex === null
                      ? 'text-white bg-[#A06ECE] border-[#A06ECE]'
                      : 'text-gray-600 hover:text-[#7126B5] hover:bg-purple-50'
                }`}
                    >
                      <span className="text-sm font-semibold whitespace-nowrap">
                        {dateInfo.day}
                      </span>
                      <span className="text-xs ml-2 md:ml-0 md:mt-1 whitespace-nowrap">
                        {dateInfo.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {canShowNext && (
              <button
                onClick={handleNextDates}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 mx-1 md:mx-2"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </button>
            )}
          </div>

          {/* <div className="relative flex px-8">
            {canShowPrevious && (
              <button
                onClick={handlePrevDates}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 mx-2"
              >
                <ChevronLeft className="w-5 h-5 text-purple-600" />
              </button>
            )}

            <div className="flex flex-1 overflow-hidden mx-4">
              <div className="grid grid-cols-7 w-full gap-1">
                {dates.map((dateInfo, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <div
                      onClick={() => handleDateClick(index)}
                      className={`flex flex-col items-center cursor-pointer transition-all duration-200 px-4 py-2 rounded-lg w-full mx-1 ${
                        activeIndex === index
                          ? 'text-white bg-[#7126B5]'
                          : dateInfo.active && activeIndex === null
                            ? 'text-white bg-[#A06ECE]'
                            : 'text-gray-600 hover:text-[#7126B5] hover:bg-purple-50'
                      }`}
                    >
                      <span className="text-sm font-semibold whitespace-nowrap">
                        {dateInfo.day}
                      </span>
                      <span className="text-xs mt-1 whitespace-nowrap">
                        {dateInfo.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {canShowNext && (
              <button
                onClick={handleNextDates}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 mx-2"
              >
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeaderTicket;
