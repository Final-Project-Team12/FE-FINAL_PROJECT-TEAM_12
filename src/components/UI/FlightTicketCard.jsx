import React, { useState } from 'react';

const FlightTicketCard = ({ flight, onCardClick, isSelected }) => {
  const {
    id,
    status,
    departure,
    arrival,
    bookingCode,
    class: flightClass,
    price,
  } = flight;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued':
        return 'bg-green-500'; // Green for Issued
      case 'Unpaid':
        return 'bg-red-500'; // Red for Unpaid
      case 'Cancelled':
        return 'bg-gray-500'; // Gray for Cancelled
      default:
        return 'bg-gray-200';
    }
  };

  const borderStyles = {
    selected: 'border-purple-500',
    unselected: 'border-gray-200 hover:border-gray-300',
  };

  const handleCardClick = () => {
    onCardClick(id);
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden border-2 ${
        isSelected
          ? 'border-purple-500'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={handleCardClick}
    >
      <span
        className={`text-white text-xs font-light rounded-full px-3 py-1 ${getStatusColor(status)}`}
      >
        {status}
      </span>
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">{departure.location}</p>
            <p className="text-gray-500">
              {departure.date} - {departure.time}
            </p>
          </div>
          <div>d</div>
          <div>
            <p className="font-bold">{arrival.location}</p>
            <p className="text-gray-500">
              {arrival.date} - {arrival.time}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">Booking Code:</p>
          <p>{bookingCode}</p>
        </div>
        <div className="mt-4">
          <p className="font-bold">Class:</p>
          <p>{flightClass}</p>
        </div>
        <div className="mt-4">
          <p className="font-bold">Price:</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketCard;
