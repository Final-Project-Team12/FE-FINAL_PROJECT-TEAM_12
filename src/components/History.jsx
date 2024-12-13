import React, { useState } from 'react';
import Navbar from '../components/UI/Navbar';
import HeaderHistory from '../components/UI/HeaderHistory';
import FlightList from './UI/History/FlightList';
import OrderDetailsPanel from './UI/History/OrderDetailsPanel';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import { flightData } from '../data/mockFlightdata';
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
      <div className="py-4 flex px-[10px] justify-center sm:flex-col sm:px-[15px] md:flex-col md:px-[20px] lg:flex-row lg:px-[50px] lg:gap-5 xl:flex-row xl:gap-12 xl:px-[260px] xl:min-h-[calc(100vh-84px)]">
        <FlightList
          flights={filteredFlightData}
          selectedCardId={selectedCardId}
          onCardClick={setSelectedCardId}
          selectedCard={selectedFlight}
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
