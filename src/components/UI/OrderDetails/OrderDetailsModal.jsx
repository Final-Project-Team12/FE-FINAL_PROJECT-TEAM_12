import React from 'react';
import FlowerLogo from '../../../../public/icons/flower_icon.svg';

const OrderDetailsModal = ({ selectedCard, onClose }) => {
  if (!selectedCard) return null;
  const { tickets, status, token, total_payment } = selectedCard;
  const firstTicket = tickets[0];
  const flightDetails = firstTicket?.plane || {};
  const getStatusColor = (status) => {
    switch (status) {
      case 'ISSUED':
        return 'bg-green-500'; // Green for Issued
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-8 lg:hidden">
      <div
        className="relative z-10 w-[90vw] sm:w-[80vw] lg:w-[60vw] max-w-3xl bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-20"
          onClick={onClose}
        >
          ×
        </button>

        <div className="relative p-6">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h2 className="font-bold mb-2 text-lg md:text-xl">
                Detail Pesanan
              </h2>
              <span
                className={`text-white text-xs font-light rounded-full px-3 py-1 flex justify-center items-center ${getStatusColor(status)}`}
              >
                {status}
              </span>
            </div>

            <div className="mb-2">
              <h2 className="font-regular">
                Booking Code:{' '}
                <span className="text-purple-800 font-bold">{token}</span>
              </h2>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-base md:text-lg">
                  {flightDetails.departure_time}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  {flightDetails.departure_time}
                </p>
              </div>
              <p className="text-purple-500 font-bold text-sm md:text-base">
                Kebarangkatan
              </p>
            </div>
            <p className="font-medium text-sm text-gray-600">
              {flightDetails.departure_terminal}
            </p>

            <div className="my-4 border-t border-gray-200"></div>

            {/* Flight Information */}
            <div className="flex items-start">
              <div className="w-10 flex justify-center p-2">
                <img className="w-8 h-8" src={FlowerLogo} alt="" />
              </div>
              <div className="flex flex-col ml-2">
                <p className="font-bold text-base md:text-lg">
                  {flightDetails.airline_id}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Flight Number: {flightDetails.plane_code}
                </p>

                <div className="pt-4">
                  <p className="font-bold text-sm md:text-base">Informasi:</p>
                  {tickets.map((ticket, index) => (
                    <div
                      key={ticket.ticket_id || index}
                      className="text-sm md:text-base"
                    >
                      <p className="text-purple-800">
                        Penumpang {index + 1}:{' '}
                        {`${ticket.passenger.title} ${ticket.passenger.full_name}`}
                      </p>
                      <p>ID: {ticket.passenger.id_number}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-4 border-t border-gray-200"></div>

            {/* Arrival Information */}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-base md:text-lg">
                  {flightDetails.arrival_time}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  {flightDetails.arrival_time}
                </p>
              </div>
              <p className="text-purple-500 font-bold text-sm md:text-base">
                Kedatangan
              </p>
            </div>
            <p className="font-medium text-sm text-gray-600">
              {flightDetails.departure_terminal}
            </p>

            <div className="my-4 border-t border-gray-200"></div>

            {/* Pricing Details */}
            <div>
              <p className="font-bold text-sm md:text-base">Rincian Harga</p>
              <div className="flex justify-between text-sm md:text-base">
                <p>{tickets.length} Penumpang</p>
                <p>IDR {total_payment.toLocaleString('id-ID')}</p>
              </div>
            </div>

            <div className="my-4 border-t border-gray-200"></div>

            <div className="flex justify-between font-bold text-sm md:text-base">
              <p>Total</p>
              <p className="text-purple-800">
                IDR {total_payment.toLocaleString('id-ID')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
              {status === 'Issued' && (
                <button className="w-full py-3 bg-purple-800 text-white rounded-lg text-sm md:text-base">
                  Cetak Ticket
                </button>
              )}
              {status === 'Unpaid' && (
                <button className="w-full py-3 bg-red-500 text-white rounded-lg text-sm md:text-base">
                  Lanjut Bayar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div className="fixed inset-0 z-1 bg-black opacity-25"></div>
    </div>
  );
};

export default OrderDetailsModal;
