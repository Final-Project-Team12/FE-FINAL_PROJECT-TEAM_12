import React, { useState } from 'react';
import Navbar from './Navbar';
import HeaderHistory from './HeaderHistory';
import FlightList from './History/FlightList';
import OrderDetailsPanel from './History/OrderDetailsPanel';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { flightData } from '../../data/mockFlightdata';
import {
  sortFlightsByDate,
  filterFlightsByDateRange,
} from '../../utils/dateUtils';

const Notification = () => {
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

  return (
    <>
      <Navbar />
      <HeaderHistory onDateRangeChange={handleDateRangeChange} />
      <div className="flex flex-col lg:flex-row gap-12 px-[260px] py-4 min-h-[calc(100vh-84px)]">
        
      </div>
    </>
  );
};

export default Notification;
