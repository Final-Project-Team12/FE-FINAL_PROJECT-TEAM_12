import React from 'react';
import { useSeatSelection } from '../../hooks/useSeatSelection';

const SeatSelection = ({ passengers }) => {
  const { selectedSeats, seatLayout, loading, handleSeatSelect } =
    useSeatSelection(passengers.length);

  if (loading || !seatLayout) return <div>Loading...</div>;

  const rows = Array.from({ length: seatLayout.totalRows }, (_, i) => i + 1);
  const { leftColumns, rightColumns } = seatLayout;

  const getSeatColor = (seatId) => {
    if (selectedSeats.includes(seatId)) return 'bg-[#7126B5]';
    if (seatLayout.specialSeats[seatId]) return 'bg-[#7126B5]';
    return 'bg-green-400 hover:bg-green-500';
  };

  const getSeatContent = (seatId) => {
    if (selectedSeats.includes(seatId)) return seatId;
    if (seatLayout.specialSeats[seatId]) return seatLayout.specialSeats[seatId];
    return '';
  };

  return (
    <div className="w-full max-w-2xl border border-gray-300 rounded-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Pilih Kursi</h2>

        <div className="bg-green-400 text-white p-4 rounded-lg mb-8 text-center">
          <h3 className="text-xl font-semibold">
            Economy - {seatLayout.availableSeats} Seats Available
          </h3>
        </div>

        <div className="flex justify-center mb-8">
          <div className="grid gap-2">
            <div className="grid grid-cols-7 gap-2">
              <div className="col-span-3 grid grid-cols-3">
                {leftColumns.map((col) => (
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
                {rightColumns.map((col) => (
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
                  {leftColumns.map((col) => {
                    const seatId = `${col}${row}`;
                    return (
                      <button
                        key={seatId}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(seatId)}
                      >
                        {getSeatContent(seatId)}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center font-semibold text-gray-500">
                  {row}
                </div>

                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {rightColumns.map((col) => {
                    const seatId = `${col}${row}`;
                    return (
                      <button
                        key={seatId}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-colors ${getSeatColor(seatId)}`}
                        onClick={() => handleSeatSelect(seatId)}
                      >
                        {getSeatContent(seatId)}
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
