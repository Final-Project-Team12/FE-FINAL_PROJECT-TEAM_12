import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveFilters,
  fetchFilteredFlights,
} from '../../store/slices/flightFilterSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeaderTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeFilters } = useSelector((state) => state.flightFilter);

  const [visibleDateRange, setVisibleDateRange] = useState({
    start: -1,
    end: 5,
  });

  const formatDay = (date) =>
    date.toLocaleDateString('id-ID', { weekday: 'long' });
  const formatDate = (date) =>
    date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  const formatAPIDate = (date) => date.toISOString().split('T')[0];

  const dates = useMemo(() => {
    const today = new Date();
    const datesArray = [];

    for (let i = visibleDateRange.start; i <= visibleDateRange.end; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      datesArray.push({
        day: formatDay(date),
        date: formatDate(date),
        apiDate: formatAPIDate(date),
        active: i === 0,
      });
    }

    return datesArray;
  }, [visibleDateRange]);

  const [activeIndex, setActiveIndex] = useState(
    dates.findIndex((d) => d.active)
  );

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

  useEffect(() => {
    const today = new Date();
    const initialDate = formatAPIDate(today);
    handleDateFilter(initialDate);
  }, []);

  const handleDateFilter = (selectedDate) => {
    dispatch(
      setActiveFilters({
        ...activeFilters,
        departureDate: selectedDate,
      })
    );

    dispatch(
      fetchFilteredFlights({
        page: 1,
        filters: {
          ...activeFilters,
          departureDate: selectedDate,
        },
      })
    );
  };

  const handleDateClick = (index) => {
    setActiveIndex(index);
    handleDateFilter(dates[index].apiDate);
  };

  const canShowPrevious = visibleDateRange.start > -30;
  const canShowNext = visibleDateRange.end < 90;

  return (
    <div className="border-b shadow-[0px_4px_10px_rgba(0,0,0,0.1)] py-5">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <h2 className="text-xl font-bold mb-6">Pilih Penerbangan</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div
            className="w-full sm:w-3/4 h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src="/icons/fi_arrow-left.svg"
              alt="Back"
              className="w-6 h-6 ml-4 hover:scale-125 transition-all duration-200 text-white"
            />
            <div className="ml-3 text-white">
              JKT {'>'} MLB - 2 Penumpang - Economy
            </div>
          </div>
          <button
            className="w-full sm:w-1/4 h-[50px] rounded-[12px] bg-[#73CA5C] font-bold text-white hover:bg-[#65b350] transition-colors"
            onClick={() => navigate('/search')}
          >
            Ubah Pencarian
          </button>
        </div>

        <div className="relative flex px-8">
          {/* Previous dates button */}
          {canShowPrevious && (
            <button
              onClick={handlePrevDates}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 mx-2"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>
          )}

          {/* Dates display */}
          <div className="flex flex-1 overflow-hidden mx-4">
            <div className="flex w-full transition-transform duration-300">
              {dates.map((dateInfo, index) => (
                <div
                  key={index}
                  className={`relative flex-1 flex justify-center items-center ${
                    index === 0
                      ? ''
                      : "before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-6 before:bg-gray-300"
                  }`}
                >
                  <div
                    onClick={() => handleDateClick(index)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-200 px-4 py-2 rounded-lg w-full mx-1 ${
                      activeIndex === index
                        ? 'text-white bg-[#7126B5]'
                        : index === dates.findIndex((d) => d.active) &&
                            activeIndex === null
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

          {/* Next dates button */}
          {canShowNext && (
            <button
              onClick={handleNextDates}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 mx-2"
            >
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTicket;
