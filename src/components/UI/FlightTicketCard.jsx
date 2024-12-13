import React, { useState } from 'react';
import Location from '../../../public/icons/location.svg';
import Arrow from '../../../public/icons/Arrow.svg';

const FlightTicketCard = ({ flight, onCardClick, isSelected, bookingDate }) => {
  const {
    id,
    status,
    departure,
    arrival,
    bookingCode,
    duration,
    flightClass,
    pricePerPerson,
    totalPassengers,
    tax,
  } = flight;

  const totalPrice = pricePerPerson * totalPassengers + tax;

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
    <div>
      <p className="font-bold mb-2">{bookingDate}</p>
      <div
        className={` bg-white shadow-md rounded-lg overflow-hidden border-2 ${
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
            <div className="flex gap-2">
              <div className="hidden md:flex">
                <img src={Location} alt="Location Icon" />
              </div>
              <div>
                <p className="font-bold">{departure.location}</p>
                <p className="font-regular">{departure.date}</p>
                <p className="font-regular">{departure.time}</p>
              </div>
            </div>
            <div className="hidden md:flex md:flex-col md:items-center md:justify-center">
              <div>{duration}</div>
              <div>
                <img src={Arrow} alt="arrow icon" />
              </div>
            </div>
            <div>
              <div className="hidden md:flex">
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
            <div className="hidden md:flex md:mt-2">
              <p className="font-bold">Class:</p>
              <p>{flightClass}</p>
            </div>
            <div className="mt-6">
              <p className="font-bold text-purple-900">
                IDR {totalPrice.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketCard;
