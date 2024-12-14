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
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(300);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial width check
    updateWidth();

    // Add resize listener
    window.addEventListener('resize', updateWidth);

    // Cleanup listener
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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
    <div className="relative z-30">
      <button
        className="h-[40px] px-4 mt-1 rounded-full border border-purple-500 flex items-center"
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
          <div
            ref={containerRef}
            className="absolute z-20 bg-white shadow-md rounded-lg p-4 w-[300px] sm:min-w-[400px] md:min-w-[400px] lg:min-w-[400px]"
            style={{
              maxWidth: '90vw',
              width: '300px',
            }}
          >
            <div className="flex justify-end mb-2">
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
            <div
              className="w-full overflow-x-auto"
              style={{
                maxWidth: '100%',
                transform: 'scale(1)',
                transformOrigin: 'top left',
              }}
            >
              <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={['#A06ECE']}
                staticRanges={[]}
                inputRanges={[]}
                // Custom styling to make it more responsive
                style={{
                  width: `${containerWidth}px`,
                  maxWidth: '100%',
                }}
                className="w-full"
              />
            </div>
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

// import { useState } from 'react';
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import FilterIcon from '../../../../public/icons/filter_icon.svg';

// const CalendarFilter = ({ onDateRangeChange }) => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: null,
//       endDate: null,
//       key: 'selection',
//     },
//   ]);

//   const handleDateRangeChange = (item) => {
//     setDateRange([item.selection]);
//   };

//   const handleSaveClick = () => {
//     if (dateRange[0].startDate && dateRange[0].endDate) {
//       onDateRangeChange(dateRange[0].startDate, dateRange[0].endDate);
//     }
//     setShowCalendar(false);
//   };

//   const handleCloseCalendar = () => {
//     setShowCalendar(false);
//   };

//   const handleFilterButtonClick = () => {
//     setShowCalendar(true);
//     const filterButton = document.querySelector(
//       '.w-[110px] .h-[50px].rounded-[12px].bg-[#A06ECE]'
//     );
//     filterButton.classList.add('bg-gray-300');
//     filterButton.focus();
//   };

//   return (
//     <div className="relative z-30">
//       <button
//         className="h-[40px] px-4 mt-1 rounded-full border border-purple-500 flex items-center "
//         onClick={handleFilterButtonClick}
//       >
//         <img className="w-6 pr-1" src={FilterIcon} alt="" /> Filter
//       </button>
//       {showCalendar && (
//         <>
//           <div
//             className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10"
//             onClick={handleCloseCalendar}
//           ></div>
//           <div className="absolute z-20 bg-white shadow-md rounded-lg p-4 w-[300px]">
//             <div className="flex justify-end mb-2">
//               <button
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={handleCloseCalendar}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <DateRange
//               editableDateInputs={true}
//               onChange={handleDateRangeChange}
//               moveRangeOnFirstSelection={false}
//               ranges={dateRange}
//             />
//             <div className="flex justify-end">
//               <button
//                 className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg"
//                 onClick={handleSaveClick}
//               >
//                 Simpan
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CalendarFilter;
