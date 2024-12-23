import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import FilterIcon from '../../../../public/icons/filter_icon.svg';
import { Filter } from 'lucide-react';

const CalendarFilter = ({ onDateRangeChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [isFiltered, setIsFiltered] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (showCalendar && buttonRef.current && containerRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = buttonRect.left;
        let top = buttonRect.bottom + 8;

        if (left + containerRect.width > viewportWidth) {
          left = Math.max(0, viewportWidth - containerRect.width - 16);
        }

        if (top + containerRect.height > viewportHeight) {
          top = Math.max(8, buttonRect.top - containerRect.height - 8);
        }

        setCalendarPosition({
          top: top,
          left: left,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [showCalendar]);

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSaveClick = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      onDateRangeChange(dateRange[0].startDate, dateRange[0].endDate);
      setIsFiltered(true);
    }
    setShowCalendar(false);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleFilterButtonClick = () => {
    setShowCalendar(true);
  };

  const handleReset = () => {
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    ]);
    onDateRangeChange(null, null);
    setIsFiltered(false);
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          ref={buttonRef}
          className={`h-10 px-4 mt-1 rounded-full border transition-colors flex items-center gap-1 ${
            isFiltered
              ? 'border-purple-500 bg-purple-500 text-white'
              : 'border-purple-500'
          }`}
          onClick={handleFilterButtonClick}
        >
          <Filter
            className={`w-6 ${isFiltered ? 'text-white' : 'text-slate-500'}`}
          />
          <span>Filter</span>
        </button>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="h-6 -ml-1 -mt-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex "
            title="Reset filter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
            onClick={handleCloseCalendar}
          />
          <div
            ref={containerRef}
            className="fixed z-50 bg-white shadow-lg rounded-lg overflow-hidden w-[320px]"
            style={{
              top: `${calendarPosition.top}px`,
              left: `${calendarPosition.left}px`,
              maxHeight: 'calc(100vh - 32px)',
            }}
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-700">
                Pilih Rentang Tanggal
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleCloseCalendar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Calendar */}
            <div
              className="w-full overflow-auto"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={['#A06ECE']}
                staticRanges={[]}
                inputRanges={[]}
                months={1}
                direction="horizontal"
                className="w-full"
              />
            </div>

            {/* Bottom buttons */}
            <div className="sticky bottom-0 left-0 right-0 p-3 bg-white border-t shadow-md flex gap-2">
              <button
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  handleReset();
                  setShowCalendar(false);
                }}
              >
                Reset
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  dateRange[0].startDate && dateRange[0].endDate
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                onClick={handleSaveClick}
                disabled={!dateRange[0].startDate || !dateRange[0].endDate}
              >
                Terapkan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarFilter;
