import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const SeatSelection = ({
  selectedSeats = [],
  maxSeats,
  onSeatSelect,
  flightData,
}) => {
  const selectedSeatClass = useSelector(
    (state) => state.flightSearch.selectedSeatClass
  );

  const seatLabelToId = useMemo(() => {
    const mapping = {};
    let id = 1;
    for (let row = 1; row <= 12; row++) {
      ['A', 'B', 'C', 'D', 'E', 'F'].forEach((col) => {
        mapping[`${col}${row}`] = id++;
      });
    }
    return mapping;
  }, []);

  const seatIdToLabel = useMemo(() => {
    const mapping = {};
    Object.entries(seatLabelToId).forEach(([label, id]) => {
      mapping[id] = label;
    });
    return mapping;
  }, [seatLabelToId]);

  const calculateSeatId = (col, row) => {
    const label = `${col}${row}`;
    const seatId = seatLabelToId[label];
    return seatId;
  };

  const getSeatLabel = (seatId) => {
    const label = seatIdToLabel[seatId];
    return label || '';
  };

  const handleSeatSelect = (col, row) => {
    const seatId = calculateSeatId(col, row);
    const isSelected = selectedSeats.includes(seatId);
    let newSelectedSeats;

    if (isSelected) {
      newSelectedSeats = selectedSeats.filter((id) => id !== seatId);
    } else {
      if (selectedSeats.length >= maxSeats) {
        Swal.fire({
          icon: 'warning',
          title: 'Maximum seats reached',
          text: `You can only select up to ${maxSeats} seats`,
          customClass: {
            container: 'select-none',
            popup: 'rounded-lg',
            title: 'text-lg sm:text-xl font-bold',
            content: 'text-sm sm:text-base',
            confirmButton:
              'bg-[#7126B5] text-white rounded-lg px-4 py-2 hover:bg-[#7126B5]/90',
          },
        });
        return;
      }
      newSelectedSeats = [...selectedSeats, seatId];
    }

    onSeatSelect(newSelectedSeats);
  };

  const getSeatColor = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      return 'bg-[#7126B5]';
    }

    const isUnavailable = flightData?.seats_detail?.some(
      (seat) => seat.seat_id === seatId && !seat.is_available
    );

    return isUnavailable
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-[#73CA5C] hover:bg-[#73CA5C]/80';
  };

  const isSeatDisabled = (seatId) => {
    const isDisabled = flightData?.seats_detail?.some(
      (seat) => seat.seat_id === seatId && !seat.is_available
    );
    return isDisabled || false;
  };

  const rows = Array.from({ length: 12 }, (_, i) => i + 1);
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="w-full max-w-2xl border border-gray-300 rounded-lg mx-auto bg-white">
      <div className="p-2 sm:p-3 md:p-4">
        <div className="bg-[#73CA5C] text-white p-2 sm:p-3 rounded-t-lg mb-3 sm:mb-4 text-center">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            {selectedSeatClass} - Seats Available
          </h3>
        </div>

        <div className="flex justify-center mb-3 sm:mb-4 w-full">
          <div className="w-full sm:w-[95%] md:w-[90%] select-none px-1">
            <div className="grid grid-cols-8 mb-1 sm:mb-2">
              <div className="col-span-3 grid grid-cols-3">
                {columns.slice(0, 3).map((col) => (
                  <div key={col} className="flex justify-center">
                    <span className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-500">
                      {col}
                    </span>
                  </div>
                ))}
              </div>

              <div className="col-span-2" />

              <div className="col-span-3 grid grid-cols-3">
                {columns.slice(3).map((col) => (
                  <div key={col} className="flex justify-center">
                    <span className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-500">
                      {col}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {rows.map((row) => (
              <div
                key={row}
                className="grid grid-cols-8 gap-[2px] sm:gap-2 md:gap-3 mb-[2px] sm:mb-2"
              >
                <div className="col-span-3 grid grid-cols-3 gap-[2px] sm:gap-2 md:gap-3">
                  {columns.slice(0, 3).map((col) => {
                    const seatId = calculateSeatId(col, row);
                    return (
                      <button
                        key={`${col}${row}`}
                        className={`aspect-square w-full max-w-[28px] sm:max-w-[40px] md:max-w-[48px] rounded sm:rounded-lg flex items-center justify-center text-white text-[8px] sm:text-sm md:text-base font-semibold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(col, row)}
                        disabled={isSeatDisabled(seatId)}
                        title={`Seat ${col}${row}`}
                      >
                        {selectedSeats.includes(seatId) ? `${col}${row}` : ''}
                      </button>
                    );
                  })}
                </div>

                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-500">
                    {row}
                  </span>
                </div>

                <div className="col-span-3 grid grid-cols-3 gap-[2px] sm:gap-2 md:gap-3">
                  {columns.slice(3).map((col) => {
                    const seatId = calculateSeatId(col, row);
                    return (
                      <button
                        key={`${col}${row}`}
                        className={`aspect-square w-full max-w-[28px] sm:max-w-[40px] md:max-w-[48px] rounded sm:rounded-lg flex items-center justify-center text-white text-[8px] sm:text-sm md:text-base font-semibold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(col, row)}
                        disabled={isSeatDisabled(seatId)}
                        title={`Seat ${col}${row}`}
                      >
                        {selectedSeats.includes(seatId) ? `${col}${row}` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 text-[10px] sm:text-sm md:text-base">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#73CA5C] rounded sm:rounded-lg" />
            <span>Available</span>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#7126B5] rounded sm:rounded-lg" />
            <span>Selected</span>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gray-400 rounded sm:rounded-lg" />
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
