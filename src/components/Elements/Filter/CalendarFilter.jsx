import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import FilterIcon from '../../../../public/icons/filter_icon.svg';

const CalendarFilter = ({ onDateRangeChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const calendarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (showCalendar && calendarRef.current && buttonRef.current) {
      const updatePosition = () => {
        const calendar = calendarRef.current;
        const button = buttonRef.current;
        const buttonRect = button.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const calendarHeight = calendar.offsetHeight;
        const calendarWidth = calendar.offsetWidth;

        // Reset position to calculate true dimensions
        calendar.style.top = '';
        calendar.style.bottom = '';
        calendar.style.left = '';
        calendar.style.right = '';

        // Check vertical position
        if (buttonRect.bottom + calendarHeight > windowHeight) {
          // Show above the button if not enough space below
          calendar.style.bottom = `${windowHeight - buttonRect.top}px`;
        } else {
          // Show below the button
          calendar.style.top = `${buttonRect.bottom}px`;
        }

        // Check horizontal position
        if (buttonRect.left + calendarWidth > windowWidth) {
          // Align to the right if not enough space
          calendar.style.right = '0';
        } else {
          // Align to the left
          calendar.style.left = `${buttonRect.left}px`;
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [showCalendar]);

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSaveClick = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      onDateRangeChange(dateRange[0].startDate, dateRange[0].endDate);
    }
    setShowCalendar(false);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleFilterButtonClick = () => {
    setShowCalendar(true);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="h-10 px-4 mt-1 rounded-full border border-purple-500 flex items-center gap-2"
        onClick={handleFilterButtonClick}
      >
        <img className="w-6" src={FilterIcon} alt="Filter Icon" />
        <span>Filter</span>
      </button>
      
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
            onClick={handleCloseCalendar}
          />
          <div
            ref={calendarRef}
            className="fixed z-50 bg-white shadow-lg rounded-lg p-4 w-[320px]"
          >
            <div className="flex justify-end mb-2">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleCloseCalendar}
                aria-label="Close calendar"
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
            
            <div className="w-full">
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
            
            <div className="flex justify-end mt-4">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                onClick={handleSaveClick}
              >
                Simpan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarFilter;