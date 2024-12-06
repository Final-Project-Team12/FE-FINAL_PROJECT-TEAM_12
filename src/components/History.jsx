import React, { useState } from 'react';
import Navbar from '../components/UI/Navbar';
import HeaderHistory from '../components/UI/HeaderHistory';
import FlightList from './UI/History/FlightList';
import OrderDetailsPanel from './UI/History/OrderDetailsPanel';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import { flightData } from '.././data/mockFlightData';
import {
  sortFlightsByDate,
  filterFlightsByDateRange,
} from '../utils/dateUtils';

const History = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const { containerHeight } = useWindowDimensions();

  const sortedFlightData = sortFlightsByDate(flightData);
  const filteredFlightData = selectedDateRange
    ? filterFlightsByDateRange(
        sortedFlightData,
        selectedDateRange.startDate,
        selectedDateRange.endDate
      )
    : sortedFlightData;

  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
    const newFilteredData = filterFlightsByDateRange(
      sortedFlightData,
      startDate,
      endDate
    );
    setSelectedCardId(
      newFilteredData.length > 0 ? newFilteredData[0].id : null
    );
  };

  const selectedFlight = filteredFlightData.find(
    (flight) => flight.id === selectedCardId
  );

  return (
    <>
      <Navbar />
      <HeaderHistory onDateRangeChange={handleDateRangeChange} />
      <div className="flex flex-col lg:flex-row gap-12 px-[260px] py-4 min-h-[calc(100vh-84px)]">
        <FlightList
          flights={filteredFlightData}
          selectedCardId={selectedCardId}
          onCardClick={setSelectedCardId}
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
