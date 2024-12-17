import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSeats } from '../../store/slices/paymentSlice';
import Swal from 'sweetalert2';

const SeatSelection = ({ maxSeats, getDataFromChildren }) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.payment.selectedSeats);

  const seatLayout = {
    totalRows: 12,
    leftColumns: ['A', 'B', 'C'],
    rightColumns: ['D', 'E', 'F'],
  };

  const calculateSeatId = (col, row) => {
    const columnMap = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
    };

    const seatId = columnMap[col] * 12 + row;
    return seatId;
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

    dispatch(setSelectedSeats(newSelectedSeats));
    getDataFromChildren(seatId);
  };

  const getSeatColor = (seatId) => {
    if (selectedSeats.includes(seatId)) return 'bg-[#7126B5]';
    return 'bg-[#73CA5C] hover:bg-[#73CA5C]/80';
  };

  const rows = Array.from({ length: seatLayout.totalRows }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-2xl border border-gray-300 rounded-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Pilih Kursi</h2>

        <div className="bg-[#73CA5C] text-white p-4 rounded-t-lg mb-8 text-center">
          <h3 className="text-xl font-semibold">Economy - Seats Available</h3>
        </div>

        <div className="flex justify-center mb-8">
          <div className="grid gap-2">
            <div className="grid grid-cols-7 gap-2">
              <div className="col-span-3 grid grid-cols-3">
                {seatLayout.leftColumns.map((col) => (
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
                {seatLayout.rightColumns.map((col) => (
                  <div
                    key={col}
                    className="text-center font-semibold text-gray-500"
                  >
                    {col}
                  </div>
                ))}
              </div>
            </div>

            {rows.map((row) => (
              <div key={row} className="grid grid-cols-7 gap-2">
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {seatLayout.leftColumns.map((col) => {
                    const seatId = calculateSeatId(col, row);
                    return (
                      <button
                        key={`${col}${row}`}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(col, row)}
                      >
                        {selectedSeats.includes(seatId) ? `${col}${row}` : ''}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center font-semibold text-gray-500">
                  {row}
                </div>

                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {seatLayout.rightColumns.map((col) => {
                    const seatId = calculateSeatId(col, row);
                    return (
                      <button
                        key={`${col}${row}`}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(col, row)}
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
      </div>
    </div>
  );
};

export default SeatSelection;
