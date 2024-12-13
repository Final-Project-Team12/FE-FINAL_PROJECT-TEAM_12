import React, { useState } from 'react';
import Navbar from './Navbar';
import HeaderNotification from './HeaderNotification';
import { Bell } from 'lucide-react';

const notif = [
  {
    type: "Promosi",
    title: "Dapatkan Potongan 50% Tiket!",
    description: "Syarat dan Ketentuan berlaku!",
    date: "2024-03-14",
    time: "14:04",
  },
  {
    type: "Pemberitahuan",
    title: "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6",
    description: "Cek jadwal perjalanan Anda disini!",
    date: "2024-03-14",
    time: "14:04",
  },
];

const Notification = () => {
  const [filterText, setFilterText] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const handleSearchTextChange = (text) => {
    setFilterText(text.toLowerCase());
  };

  const filteredNotif = notif.filter((n) => {
    const matchesText =
      n.title.toLowerCase().includes(filterText) ||
      n.description.toLowerCase().includes(filterText);

    const notifDate = new Date(n.date);
    const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
    const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

    const matchesDate =
      (!startDate || notifDate >= startDate) &&
      (!endDate || notifDate <= endDate);

    return matchesText && matchesDate;
  });

  const getDotColor = (type) => {
    return type === "Promosi" ? "bg-green-600" : "bg-red-600";
  };

  return (
    <>
      <Navbar />
      <HeaderNotification
        onDateRangeChange={handleDateRangeChange}
        onSearchTextChange={handleSearchTextChange}
      />
      <div className="px-[280px] py-4 mt-3">
        <div className="w-full flex-col gap-12">
          {filteredNotif.length > 0 ? (
            filteredNotif.map((notif, index) => (
              <React.Fragment key={index}>
                <div className="flex w-full space-x-4">
                  <div>
                    <Bell className="bg-purple-400 w-6 h-6 text-white rounded-full p-1 mt-1" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <span className="text-slate-500 text-sm">{notif.type}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500 text-sm">
                          {notif.date}, {notif.time}
                        </span>
                        <div className={`rounded-full w-2 h-2 ${getDotColor(notif.type)}`}></div>
                      </div>
                    </div>
                    <h3>{notif.title}</h3>
                    <p className="text-slate-500 text-sm">{notif.description}</p>
                  </div>
                </div>
                <hr className="my-4 bg-slate-400" />
              </React.Fragment>
            ))
          ) : (
            <p className="text-slate-500 text-center">Tidak ada notifikasi yang sesuai.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
