import React, { useState } from 'react';
import Navbar from './Navbar';
import HeaderHistory from './HeaderHistory';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { flightData } from '../../data/mockFlightdata';
import {
  sortFlightsByDate,
  filterFlightsByDateRange,
} from '../../utils/dateUtils';
import { Bell } from 'lucide-react';

const notif = [
  {
    type: "Promosi",
    title: "Dapatkan Potongan 50% Tiket!",
    description: "Syarat dan Ketentuan berlaku!",
    date: "14 Maret 2020",
    time: "14:04"
  },
  {
    type: "Pemberitahuan",
    title: "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6",
    description: "Cek jadwal perjalanan Anda disini!",
    date: "14 Maret 2020",
    time: "14:04"
  }
];

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

  const getDotColor = (type) => {
    return type === "Promosi" ? "bg-green-600" : "bg-red-600";
  };

  return (
    <>
      <Navbar />
      <HeaderHistory onDateRangeChange={handleDateRangeChange} />
      <div className="w-full flex-col lg:flex-row gap-12 px-[280px] py-4 min-h-[calc(100vh-84px)] mt-3">
        {notif.map((notif, index) => (
          <><div key={index} className="flex w-full space-x-4">
            <div>
              <Bell className="bg-purple-400 w-6 h-6 text-white rounded-full p-1 mt-1" />
            </div>

            <div className="w-full">
              <div className="flex justify-between w-full">
                <span className="text-slate-500 text-sm">{notif.type}</span>
                <div  className="flex items-center space-x-2">
                  <span className="text-slate-500 text-sm">{notif.date}, {notif.time} </span>
                  <div className={`rounded-full w-2 h-2 ${getDotColor(notif.type)}`}></div>
                </div>
                
              </div>
              <h3>{notif.title}</h3>
              <p className="text-slate-500 text-sm">
                {notif.description}
              </p>
            </div>
          </div><hr className="my-4 bg-slate-400" /></>
        ))};
      </div>
    </>
  );
};

export default Notification;