import React, { useState } from 'react';
import { getStatusColor, formatCurrency } from '../../../utils/orderUtils';
import { usePaymentHandler } from '../../../hooks/usePaymentHandler';
import usePrintTicket from '../../../hooks/usePrintTIcket';
import FlightInfo from '../flightInfo';
import PassengerInfo from '../PassengerInfo';
import PrintTicketModal from '../PrintTicketModal';
import Divider from '../Divider';

const OrderDetails = ({ selectedCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handlePayment, loading } = usePaymentHandler();
  const printTicket = usePrintTicket();

  if (!selectedCard) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-gray-500">No order selected</p>
      </div>
    );
  }

  const {
    tickets = [],
    status = '',
    token = '',
    total_payment = 0,
    user = {},
    transaction_id,
  } = selectedCard;

  const firstTicket = tickets?.[0] || {};
  const flightDetails = firstTicket?.plane || {};

  const handleProceedToPayment = () => {
    handlePayment(flightDetails, total_payment, user);
  };

  const handleCetak = async () => {
    try {
      await printTicket({ transaction_id });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Terjadi kesalahan saat mencetak tiket:', error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold mb-2">Detail Pesanan</h2>
        </div>
        <div>
          <span
            className={`text-white text-xs font-light rounded-full px-3 py-1 ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="mb-2">
        <h2 className="font-regular">
          Booking Code:{' '}
          <span className="text-purple-800 font-bold">{token}</span>
        </h2>
      </div>

      <FlightInfo
        type="departure"
        time={flightDetails.departure_time}
        terminal={flightDetails.departure_terminal}
        airport={flightDetails.origin_airport}
      />

      <Divider />

      <PassengerInfo
        tickets={tickets}
        plane={firstTicket.plane}
        seat={firstTicket.seat}
        airline={firstTicket.plane.airline}
      />

      <Divider />

      <FlightInfo
        type="arrival"
        time={flightDetails.arrival_time}
        terminal={flightDetails.departure_terminal}
        airport={flightDetails.destination_airport}
      />

      <Divider />

      <div className="flex flex-col gap-2 px-5">
        <p className="font-bold text-sm">Rincian Harga</p>
        <div className="flex justify-between text-sm font-regular">
          <p>{tickets.length} Penumpang</p>
          <p>{formatCurrency(total_payment)}</p>
        </div>
      </div>

      <Divider />

      <div className="w-11/12 flex justify-between ml-5">
        <p className="font-bold">Total</p>
        <p className="font-bold text-purple-800">
          {formatCurrency(total_payment)}
        </p>
      </div>

      <div className="w-full mt-4">
        {status === 'SUCCESS' && (
          <button
            className="w-full h-16 bg-purple-800 text-white px-4 py-2 rounded-lg"
            onClick={handleCetak}
          >
            Cetak Ticket
          </button>
        )}
        {status === 'PENDING' && (
          <button
            onClick={handleProceedToPayment}
            disabled={loading}
            className="w-full h-16 bg-red-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Lanjut Bayar'}
          </button>
        )}
      </div>

      <PrintTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OrderDetails;
