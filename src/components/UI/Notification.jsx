import React, { useState } from 'react';
import Navbar from './Navbar';
import HeaderHistory from './HeaderHistory';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { flightData } from '../../data/mockFlightdata';
import {
  sortFlightsByDate,
  filterFlightsByDateRange,
} from '../../utils/dateUtils';
import { Bell, PencilLine } from 'lucide-react';

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
      <div className="flex-col lg:flex-row gap-12 px-[260px] py-4 min-h-[calc(100vh-84px)]">
        <div className="flex p-4 sm:p-6 space-x-4">
          <div>
            <Bell className="bg-purple-400 w-6 h-6 text-white rounded-full p-1 mt-2"/>
          </div>
          
          <div>
            <span className="text-slate-500 text-sm">Promosi</span>
            <h3>Dapatkan Potongan 50% Tiket!</h3>
            <p className="text-slate-500 text-sm">Syarat dan Ketentuan berlaku!</p>
          </div>
        </div>
        <hr className="my-4 bg-slate-400" />

        <div className="flex p-4 sm:p-6 space-x-4">
          <div>
            <Bell className="bg-purple-400 w-6 h-6 text-white rounded-full p-1 mt-2"/>
          </div>
          
          <div>
            <span className="text-slate-500 text-sm">Promosi</span>
            <h3>Dapatkan Potongan 50% Tiket!</h3>
            <p className="text-slate-500 text-sm">Syarat dan Ketentuan berlaku!</p>
          </div>
          <hr className="my-4 bg-slate-400" />
        </div>
      </div>
    </>
  );
};

export default Notification;
