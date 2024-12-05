import React, { useState } from 'react';

const FlightTicketCard = ({ flight }) => {
  const {
    status,
    departure,
    arrival,
    bookingCode,
    class: flightClass,
    price,
  } = flight;

  const statusStyles = {
    issued: 'bg-green-500 text-white',
    unpaid: 'bg-red-500 text-white',
    cancelled: 'bg-gray-400 text-white',
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className={`px-4 py-2 ${statusStyles[status]}`}>
        <p className="font-bold">{status.toUpperCase()}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">{departure.location}</p>
            <p className="text-gray-500">
              {departure.date} - {departure.time}
            </p>
          </div>
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
