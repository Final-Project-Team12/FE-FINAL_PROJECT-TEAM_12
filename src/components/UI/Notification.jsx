import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import Navbar from './Navbar';
import HeaderNotification from './HeaderNotification';
import { useNotification } from '../../hooks/useNotification';

const Notification = () => {
  const { notifications, error } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedNotif, setSelectedNotif] = useState(null);

  useEffect(() => {
    const filtered = notifications.filter((item) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower);

      const matchesDateRange =
        dateRange.startDate && dateRange.endDate
          ? new Date(item.notification_date) >= new Date(dateRange.startDate) &&
            new Date(item.notification_date) <= new Date(dateRange.endDate)
          : true;

      return matchesSearch && matchesDateRange;
    });

    setFilteredNotifications(filtered);
  }, [searchQuery, dateRange, notifications]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const openModal = (notif) => {
    setSelectedNotif(notif);
  };

  const closeModal = () => {
    setSelectedNotif(null);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Navbar />
      <HeaderNotification
        onSearch={handleSearch}
        onDateRangeChange={handleDateRangeChange}
      />
      <div className="w-full flex-col lg:flex-row gap-12 px-4 lg:px-[280px] py-4 min-h-[calc(100vh-84px)] mt-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.notification_id}
              onClick={() => openModal(item)}
              className="cursor-pointer"
            >
              <div className="flex w-full space-x-4">
                <div>
                  <Bell className="bg-purple-400 w-6 h-6 text-white rounded-full p-1 mt-1" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <span className="text-slate-500 text-sm">
                      {item.user?.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 text-sm">
                        {formatDate(item.notification_date)},{' '}
                        {formatTime(item.notification_date)}
                      </span>
                      <div
                        className={`rounded-full w-2 h-2 ${
                          item.is_read ? 'bg-gray-400' : 'bg-purple-600'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <h3
                    className={item.is_read ? 'text-gray-500' : 'font-medium'}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              </div>
              <hr className="my-4 bg-slate-400" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada notifikasi yang sesuai dengan pencarian Anda.
          </p>
        )}
      </div>

      {selectedNotif && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[500px] relative">
            <div className="flex items-start space-x-2">
              <div
                className={`rounded-full w-3 h-3 mt-1 ${
                  selectedNotif.is_read ? 'bg-gray-400' : 'bg-purple-600'
                }`}
              ></div>
              <h2 className="text-xl font-bold leading-tight">
                {selectedNotif.title}
              </h2>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formatDate(selectedNotif.notification_date)},{' '}
              {formatTime(selectedNotif.notification_date)}
            </p>
            <p className="mt-2">{selectedNotif.description}</p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
