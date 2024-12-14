import { useState } from 'react';
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
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="relative">
      <button
        className="h-[40px] w-full sm:w-auto px-4 mt-1 rounded-full border border-purple-500 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={handleFilterButtonClick}
      >
        <img className="w-6" src={FilterIcon} alt="Filter Icon" /> Filter
      </button>
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10"
            onClick={handleCloseCalendar}
          ></div>
          <div className="fixed sm:absolute z-20 bg-white shadow-md rounded-lg w-[95%] sm:w-auto max-w-[400px] max-h-[90vh] left-1/2 sm:left-auto right-auto sm:right-0 top-[20%] sm:top-full -translate-x-1/2 sm:translate-x-0 sm:translate-y-2 overflow-y-auto">
            <div className="sticky top-0 flex justify-end p-2 bg-white z-30 border-b">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 transition duration-300"
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
            <div className="p-4">
              <div className="overflow-x-auto">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateRangeChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  className="!w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out"
                  onClick={handleSaveClick}
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

export default CalendarFilter;