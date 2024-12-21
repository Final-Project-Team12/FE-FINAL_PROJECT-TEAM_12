import React, { useState } from 'react';
import Location from '../../../public/icons/location.svg';
import Arrow from '../../../public/icons/Arrow.svg';
import Button from '../Elements/Buttons/Button';
import OrderDetailsModal from './OrderDetails/OrderDetailsModal';

const FlightTicketCard = ({
  flight = {},
  onCardClick,
  isSelected,
  selectedCard,
}) => {
  const {
    transaction_id,
    status = '',
    transaction_date,
    total_payment = 0,
    tickets = [],
  } = flight;

  const firstTicket = tickets[0];
  const flightDetails = firstTicket?.plane || {};

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CANCELLED':
      case 'EXPIRED':
        return 'bg-red-500';
      default:
        return 'bg-gray-200';
    }
  };

  const handleCardClick = () => {
    onCardClick(transaction_id);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <p className="font-bold mb-2">{formatDate(transaction_date)}</p>
      <div
        className={`bg-white shadow-md rounded-lg overflow-hidden border-2 ${
          isSelected
            ? 'border-purple-500'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={handleCardClick}
      >
        <div className="p-4">
          <span
            className={`text-white text-xs font-light rounded-full px-3 py-1 ${getStatusColor(status)}`}
          >
            {status}
          </span>
          <div className="flex justify-between py-3 gap-3">
            <div className="gap-2">
              <div className="hidden md:flex">
                <img src={Location} alt="Location Icon" />
              </div>
              <div>
                <p className="font-regular">
                  {formatDate(flightDetails.departure_time)}
                </p>
                <p className="font-regular">
                  {formatTime(flightDetails.departure_time)}
                </p>
              </div>
            </div>
            <div className="hidden md:flex md:flex-col md:items-center md:justify-center">
              <div>{flightDetails.duration} mins</div>
              <div>
                <img src={Arrow} alt="arrow icon" />
              </div>
            </div>
            <div>
              <div className="hidden md:flex">
                <img src={Location} alt="Location Icon" />
              </div>
              <div>
                <p className="font-regular">
                  {formatDate(flightDetails.arrival_time)}
                </p>
                <p className="font-regular">
                  {formatTime(flightDetails.arrival_time)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full pt-1">
            <hr className="h-px bg-gray-200 border-1 dark:bg-gray-500" />
          </div>
          <div className="flex justify-between">
            <div className="mt-2">
              <p className="font-bold">Booking Code:</p>
              <p>{flight.token}</p>
            </div>
            <div className="hidden md:flex md:mt-2">
              <p className="font-bold">Class:</p>
              <p>{firstTicket?.seat?.class}</p>
            </div>
            <div className="mt-6">
              <p className="font-bold text-purple-900">
                IDR {total_payment.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
          <div className="block mt-3 lg:hidden">
            <Button onClick={() => setIsModalOpen(true)}>Details</Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <OrderDetailsModal
          flight={flight}
          onClose={() => setIsModalOpen(false)}
          selectedCard={selectedCard}
        />
      )}
    </div>
  );
};

export default FlightTicketCard;
