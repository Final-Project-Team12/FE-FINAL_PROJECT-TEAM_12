import React from 'react';
import FlightTicketCard from '../FlightTicketCard';

const FlightList = ({
  flights,
  selectedCardId,
  onCardClick,
  selectedCard,
  searchQuery,
}) => {
  if (!flights || flights.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-gray-500 text-xl">
          No order data found for the selected date range.
        </p>
      </div>
    );
  }

  const safeIncludes = (value, searchTerm) => {
    if (value === null || value === undefined) return false;
    return String(value).toLowerCase().includes(searchTerm);
  };

  const filteredFlights = flights?.filter((flight) => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    const firstTicket = flight.tickets?.[0] || {};
    const flightDetails = firstTicket.plane || {};

    return (
      safeIncludes(flight.transaction_id, searchLower) ||
      safeIncludes(flight.token, searchLower) ||
      safeIncludes(flightDetails.departure_city, searchLower) ||
      safeIncludes(flightDetails.arrival_city, searchLower) ||
      safeIncludes(flightDetails.airline_name, searchLower) ||
      safeIncludes(firstTicket.seat?.class, searchLower) ||
      safeIncludes(flight.status, searchLower)
    );
  });

  if (!filteredFlights || filteredFlights.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-gray-500 text-xl">
          {searchQuery
            ? 'No flights found matching your search.'
            : 'No order data found for the selected date range.'}
        </p>
      </div>
    );
  }

  return (
    <div className="lg:w-3/5 sm:w-full space-y-4">
      {filteredFlights.map((flight) => (
        <FlightTicketCard
          key={`${flight.transaction_id}-${flight.token}`} // Using a combination of transaction_id and token for uniqueness
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
