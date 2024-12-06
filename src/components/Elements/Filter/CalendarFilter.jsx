import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CalendarFilter = ({ onDateRangeChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSaveClick = () => {
    onDateRangeChange(dateRange[0].startDate, dateRange[0].endDate);
    setShowCalendar(false);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleFilterButtonClick = () => {
    setShowCalendar(true);
    const filterButton = document.querySelector(
      '.w-[110px] .h-[50px].rounded-[12px].bg-[#A06ECE]'
    );
    filterButton.classList.add('bg-gray-300');
    filterButton.focus();
  };

  return (
    <div className="relative">
      <div
        className="w-[110px] h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center cursor-pointer"
        onClick={handleFilterButtonClick}
      >
        <div className="mx-auto text-white">Filter</div>
      </div>
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10"
            onClick={handleCloseCalendar}
          ></div>
          <div className="absolute z-20 bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-end mb-2">
              <button
                className="text-gray-500 hover:text-gray-700"
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
            <DateRange
              editableDateInputs={true}
              onChange={handleDateRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
            <div className="flex justify-end">
              <button
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg"
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
