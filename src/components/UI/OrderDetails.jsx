import React from 'react';

const OrderDetails = ({ selectedCard }) => {
  return (
    <div>
      <h2 className="text-1xl font-bold mb-4">Detail Pesanan</h2>
      <p>Airline: {selectedCard.airline}</p>
      <p>Flight Number: {selectedCard.flightNumber}</p>
      <p>
        Departure: {selectedCard.departure.location} (
        {selectedCard.departure.code}) - {selectedCard.departure.date}{' '}
        {selectedCard.departure.time}
      </p>
      <p>
        Arrival: {selectedCard.arrival.location} ({selectedCard.arrival.code}) -{' '}
        {selectedCard.arrival.date} {selectedCard.arrival.time}
      </p>
      <p>Duration: {selectedCard.duration}</p>
      <p>Price: {selectedCard.price}</p>
      <p>Booking Code: {selectedCard.bookingCode}</p>
      <p>Flight Class: {selectedCard.flightClass}</p>
      <div className="mt-4">
        {selectedCard.status === 'Issued' && (
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
            Cetak Ticket
          </button>
        )}
        {selectedCard.status === 'Unpaid' && (
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Lanjut Bayar
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
