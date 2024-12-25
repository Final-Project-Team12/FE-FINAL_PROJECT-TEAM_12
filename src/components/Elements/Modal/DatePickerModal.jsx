import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DatePickerModal = ({
  isOpen,
  onClose,
  onSelect,
  selectedDate,
  title,
  minDate,
}) => {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const [nextMonthDate, setNextMonthDate] = useState(() => {
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    next.setHours(0, 0, 0, 0);
    return next;
  });

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    setNextMonthDate(
      new Date(nextMonthDate.setMonth(nextMonthDate.getMonth() - 1))
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    setNextMonthDate(
      new Date(nextMonthDate.setMonth(nextMonthDate.getMonth() + 1))
    );
  };

  const isCurrentMonth = (date) => {
    return date && date.getMonth() === currentDate.getMonth();
  };

  const isSelected = (date) => {
    return (
      date &&
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateSelection = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (minDate) {
      const minDateTime = new Date(minDate);
      minDateTime.setHours(0, 0, 0, 0);

      if (selectedDate >= minDateTime) {
        onSelect(selectedDate);
      } else {
        alert('Tanggal kembali tidak boleh lebih awal dari tanggal berangkat');
      }
    } else {
      onSelect(selectedDate);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
      <div className="bg-white rounded-2xl p-4 max-w-2xl w-full mx-4 mt-32 animate-[slideUp_0.3s_ease-out]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePreviousMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <h4 className="text-sm font-medium">
                {months[currentDate.getMonth()]} - {currentDate.getFullYear()}
              </h4>
              <div className="w-6" />
            </div>
            <Calendar
              days={getDaysInMonth(currentDate)}
              daysOfWeek={daysOfWeek}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              onSelect={handleDateSelection}
              minDate={minDate}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-6" />
              <h4 className="text-sm font-medium">
                {months[nextMonthDate.getMonth()]} -{' '}
                {nextMonthDate.getFullYear()}
              </h4>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <Calendar
              days={getDaysInMonth(nextMonthDate)}
              daysOfWeek={daysOfWeek}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              onSelect={handleDateSelection}
              minDate={minDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Calendar = ({
  days,
  daysOfWeek,
  isCurrentMonth,
  isSelected,
  onSelect,
  minDate,
}) => (
  <div className="grid grid-cols-7 gap-1">
    {daysOfWeek.map((day) => (
      <div
        key={day}
        className="h-8 flex items-center justify-center text-gray-500 text-xs"
      >
        {day}
      </div>
    ))}
    {days.map((date, index) => {
      const isDisabled = minDate && date && date < minDate;
      return (
        <div
          key={index}
          className={`h-8 flex items-center justify-center rounded-md text-xs
            ${date ? 'cursor-pointer hover:bg-purple-50' : ''}
            ${isSelected(date) ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}
            ${!isSelected(date) && date ? 'text-gray-700' : 'text-gray-300'}
            ${isDisabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}
          `}
          onClick={() => date && !isDisabled && onSelect(date)}
        >
          {date ? date.getDate() : ''}
        </div>
      );
    })}
  </div>
);

export default DatePickerModal;
