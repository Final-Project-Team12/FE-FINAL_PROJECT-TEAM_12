import React, { useEffect, useState } from 'react';
import Navbar from '../components/UI/Navbar';
import FlightList from './UI/History/FlightList';
import OrderDetailsPanel from './UI/History/OrderDetailsPanel';
import HeaderHistory from './UI/HeaderHistory';
import LoadingHistory from './UI/LoadingHistory';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import {
  sortFlightsByDate,
  filterFlightsByDateRange,
} from '../utils/dateUtils';
import useOrderHistory from '../hooks/useOrderHistory';

const History = () => {
  const { orderHistory, loading, error } = useOrderHistory();
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { containerHeight } = useWindowDimensions();

  const safeIncludes = (value, searchTerm) => {
    if (value === null || value === undefined) return false;
    return String(value).toLowerCase().includes(searchTerm);
  };

  const sortedFlightData = orderHistory ? sortFlightsByDate(orderHistory) : [];

  const dateFilteredFlightData = selectedDateRange
    ? filterFlightsByDateRange(
        sortedFlightData,
        selectedDateRange.startDate,
        selectedDateRange.endDate
      )
    : sortedFlightData;

  const filteredFlightData = searchQuery
    ? dateFilteredFlightData.filter((flight) => {
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
      })
    : dateFilteredFlightData;

  useEffect(() => {
    if (!loading && orderHistory?.length > 0 && !selectedCardId) {
      setSelectedCardId(orderHistory[0].transaction_id);
    }
  }, [loading, orderHistory, selectedCardId]);

  // Update selectedCardId only if current selection is not in filtered results
  useEffect(() => {
    if (filteredFlightData.length > 0) {
      const currentCardExists = filteredFlightData.some(
        (flight) => flight.transaction_id === selectedCardId
      );

      if (!currentCardExists) {
        setSelectedCardId(filteredFlightData[0].transaction_id);
      }
    } else {
      setSelectedCardId(null);
    }
  }, [filteredFlightData, selectedCardId]);

  if (loading) {
    return <LoadingHistory />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error: {error}
      </div>
    );
  }

  const selectedFlight = filteredFlightData.find(
    (flight) => flight.transaction_id === selectedCardId
  );

  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar />
      <HeaderHistory
        onDateRangeChange={handleDateRangeChange}
        onSearchChange={handleSearchChange}
      />
      <div className="py-4 flex px-[10px] justify-center sm:flex-col sm:px-[15px] md:flex-col md:px-[20px] lg:flex-row lg:px-[50px] lg:gap-5 xl:flex-row xl:gap-12 xl:px-[260px] xl:min-h-[calc(100vh-84px)]">
        <FlightList
          flights={filteredFlightData}
          selectedCardId={selectedCardId}
          onCardClick={setSelectedCardId}
          selectedCard={selectedFlight}
          searchQuery={searchQuery}
        />
        {filteredFlightData.length > 0 && (
          <OrderDetailsPanel
            selectedCard={selectedFlight}
            containerHeight={containerHeight}
          />
        )}
      </div>
    </>
  );
};

export default History;
