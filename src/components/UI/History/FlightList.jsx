import React from 'react';
import FlightTicketCard from '../FlightTicketCard';

const FlightList = ({ flights, selectedCardId, onCardClick, selectedCard }) => {
  if (!flights || flights.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-gray-500 text-xl">
          No order data found for the selected date range.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:w-3/5 sm:w-full space-y-4">
      {flights.map((flight) => (
        <FlightTicketCard
          key={flight.transaction_id}
          flight={flight}
          onCardClick={onCardClick}
          isSelected={flight.transaction_id === selectedCardId}
          selectedCard={selectedCard}
        />
      ))}
    </div>
  );
};

export default FlightList;
