import React, { useState } from 'react';
import Location from '../../../public/icons/location.svg';
import Arrow from '../../../public/icons/arrow.svg';

const FlightTicketCard = ({ flight, onCardClick, isSelected }) => {
  const {
    id,
    status,
    departure,
    arrival,
    bookingCode,
    duration,
    flightClass,
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
      <div className="p-4">
        <span
          className={`text-white text-xs font-light rounded-full px-3 py-1 ${getStatusColor(status)}`}
        >
          {status}
        </span>
        <div className="flex justify-between py-3">
          <div className="flex gap-2">
            <div>
              <img src={Location} alt="Location Icon" />
            </div>
            <div>
              <p className="font-bold">{departure.location}</p>
              <p className="font-regular">{departure.date}</p>
              <p className="font-regular">{departure.time}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>{duration}</div>
            <div>
              <img src={Arrow} alt="arrow icon" />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <img src={Location} alt="Location Icon" />
            </div>
            <div>
              <p className="font-bold">{arrival.location}</p>
              <p className="font-regular">{arrival.date}</p>
              <p className="font-regular">{arrival.time}</p>
            </div>
          </div>
        </div>
        <div className="w-full pt-1">
          <hr className="h-px bg-gray-200 border-1 dark:bg-gray-500"></hr>
        </div>
        <div className="flex justify-between">
          <div className="mt-2">
            <p className="font-bold">Booking Code:</p>
            <p>{bookingCode}</p>
          </div>
          <div className="mt-2">
            <p className="font-bold">Class:</p>
            <p>{flightClass}</p>
          </div>
          <div className="mt-6">
            <p className="font-bold text-purple-900">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketCard;
