import React, { useEffect, useState } from 'react';
import Navbar from '../components/UI/Navbar';
import FlightList from './UI/History/FlightList';
import OrderDetailsPanel from './UI/History/OrderDetailsPanel';
import HeaderHistory from './UI/HeaderHistory';
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
  const { containerHeight } = useWindowDimensions();

  useEffect(() => {
    if (!loading && orderHistory?.length > 0 && !selectedCardId) {
      setSelectedCardId(orderHistory[0].transaction_id);
    }
  }, [loading, orderHistory, selectedCardId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading order history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error: {error}
      </div>
    );
  }

  // Pastikan orderHistory ada sebelum sorting
  const sortedFlightData = orderHistory ? sortFlightsByDate(orderHistory) : [];
  const filteredFlightData = selectedDateRange
    ? filterFlightsByDateRange(
        sortedFlightData,
        selectedDateRange.startDate,
        selectedDateRange.endDate
      )
    : sortedFlightData;

  const selectedFlight = filteredFlightData.find(
    (flight) => flight.transaction_id === selectedCardId
  );

  const handleDateRangeChange = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
    const newFilteredData = filterFlightsByDateRange(
      sortedFlightData,
      startDate,
      endDate
    );
    setSelectedCardId(
      newFilteredData.length > 0 ? newFilteredData[0].transaction_id : null
    );
  };

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
