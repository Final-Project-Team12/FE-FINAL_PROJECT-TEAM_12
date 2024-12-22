import { useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';

const SeatSelection = ({
  selectedSeats = [],
  maxSeats,
  onSeatSelect,
  flightData,
}) => {
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
    <div className="w-full max-w-2xl border border-gray-300 rounded-lg">
      <div className="p-6">
        <div className="bg-[#73CA5C] text-white p-4 rounded-t-lg mb-8 text-center">
          <h3 className="text-xl font-semibold">Economy - Seats Available</h3>
        </div>

        <div className="flex justify-center mb-8">
          <div className="grid gap-2">
            {/* Column Headers */}
            <div className="grid grid-cols-7 gap-2">
              <div className="col-span-3 grid grid-cols-3">
                {columns.slice(0, 3).map((col) => (
                  <div
                    key={col}
                    className="text-center font-semibold text-gray-500"
                  >
                    {col}
                  </div>
                ))}
              </div>
              <div />
              <div className="col-span-3 grid grid-cols-3">
                {columns.slice(3).map((col) => (
                  <div
                    key={col}
                    className="text-center font-semibold text-gray-500"
                  >
                    {col}
                  </div>
                ))}
              </div>
            </div>

            {/* Seat Grid */}
            {rows.map((row) => (
              <div key={row} className="grid grid-cols-7 gap-2">
                {/* Left Block (ABC) */}
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {columns.slice(0, 3).map((col) => {
                    const seatId = calculateSeatId(col, row);
                    return (
                      <button
                        key={`${col}${row}`}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(col, row)}
                        disabled={isSeatDisabled(seatId)}
                        title={`Seat ${col}${row} (ID: ${seatId})`}
                      >
                        {selectedSeats.includes(seatId) ? `${col}${row}` : ''}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center font-semibold text-gray-500">
                  {row}
                </div>

                {/* Right Block (DEF) */}
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {columns.slice(3).map((col) => {
                    const seatId = calculateSeatId(col, row);
                    return (
                      <button
                        key={`${col}${row}`}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(col, row)}
                        disabled={isSeatDisabled(seatId)}
                        title={`Seat ${col}${row} (ID: ${seatId})`}
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

        {/* Seat Legend */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#73CA5C] rounded" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#7126B5] rounded" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-400 rounded" />
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
