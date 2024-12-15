import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeaderNotification from './HeaderNotification';
import { Bell } from 'lucide-react';

const notif = [
  {
    type: "Promosi",
    title: "Dapatkan Potongan 50% Tiket!",
    description: "Syarat dan Ketentuan berlaku!",
    date: "2024-12-13",
    time: "14:04",
  },
  {
    type: "Pemberitahuan",
    title: "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6",
    description: "",
    date: "2024-12-13",
    time: "14:04",
  },
  {
    type: "Promosi",
    title: "Flash Sale! Diskon 70% untuk Rute Domestik",
    description: "Berlaku hingga tengah malam hari ini!",
    date: "2024-12-13",
    time: "15:30",
  },
  {
    type: "Pemberitahuan",
    title: "Check-in Online Telah Dibuka",
    description: "Untuk penerbangan ID-789 besok pukul 08:00",
    date: "2024-12-13",
    time: "16:15",
  },
  {
    type: "Pemberitahuan",
    title: "Pembaruan Aplikasi Tersedia",
    description: "Versi terbaru 2.5.0 siap diunduh",
    date: "2024-12-13",
    time: "16:45",
  },
  {
    type: "Promosi",
    title: "Bundling Tiket + Hotel Hemat 30%",
    description: "Pesan sekarang untuk liburan akhir tahun!",
    date: "2024-12-13",
    time: "17:20",
  },
  {
    type: "Pemberitahuan",
    title: "Gate Perubahan untuk ID-456",
    description: "Gate baru: A7 (sebelumnya A5)",
    date: "2024-12-13",
    time: "17:45",
  },
  {
    type: "Pemberitahuan",
    title: "Maintenance Pemberitahuan",
    description: "Pemberitahuan akan maintenance pada 14 Dec 2024 02:00-04:00",
    date: "2024-12-13",
    time: "18:00",
  },
  {
    type: "Promosi",
    title: "Cashback 10% dengan Kartu Kredit BCA",
    description: "Minimal transaksi Rp 1.000.000",
    date: "2024-12-13",
    time: "18:30",
  },
  {
    type: "Pemberitahuan",
    title: "Boarding Pass Digital Tersedia",
    description: "Untuk penerbangan GA-234 besok",
    date: "2024-12-13",
    time: "19:00",
  },
  {
    type: "Pemberitahuan",
    title: "Verifikasi Email Berhasil",
    description: "Akun Anda telah terverifikasi",
    date: "2024-12-13",
    time: "19:15",
  },
  {
    type: "Promosi",
    title: "Promo Khusus Member!",
    description: "Extra bagasi 10kg untuk semua rute",
    date: "2024-12-13",
    time: "19:45",
  },
  {
    type: "Pemberitahuan",
    title: "Delay Penerbangan ID-890",
    description: "Estimasi delay 45 menit",
    date: "2024-12-13",
    time: "20:00",
  },
  {
    type: "Pemberitahuan",
    title: "Pembayaran Berhasil",
    description: "Booking ID: 78HJ9 telah dikonfirmasi",
    date: "2024-12-13",
    time: "20:15",
  },
  {
    type: "Promosi",
    title: "Buy 1 Get 1 Tiket Jakarta-Bali!",
    description: "Periode terbang Jan-Mar 2025",
    date: "2024-12-13",
    time: "20:45",
  },
  {
    type: "Pemberitahuan",
    title: "Pengingat Check-in",
    description: "12 jam sebelum keberangkatan ID-567",
    date: "2024-12-13",
    time: "21:00",
  },
  {
    type: "Pemberitahuan",
    title: "Perubahan Password Berhasil",
    description: "Password akun Anda telah diperbarui",
    date: "2024-12-13",
    time: "21:30",
  },
  {
    type: "Promosi",
    title: "Diskon Akhir Tahun 40%",
    description: "Untuk semua rute internasional",
    date: "2024-12-13",
    time: "22:00",
  },
  {
    type: "Pemberitahuan",
    title: "Perubahan Terminal Keberangkatan",
    description: "ID-123 pindah ke Terminal 3",
    date: "2024-12-13",
    time: "22:30",
  },
  {
    type: "Pemberitahuan",
    title: "Sinkronisasi Data Selesai",
    description: "Data perjalanan Anda telah diperbarui",
    date: "2024-12-13",
    time: "23:00",
  }
];

const Notification = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotif, setFilteredNotif] = useState(notif);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [selectedNotif, setSelectedNotif] = useState(null); // State untuk modal

  const getDotColor = (type) => {
    return type === 'Promosi' ? 'bg-green-600' : 'bg-red-600';
  };

  const formatLongDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    const filtered = notif.filter((item) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower);

      const matchesDateRange = dateRange.startDate && dateRange.endDate
        ? new Date(item.date) >= new Date(dateRange.startDate) &&
          new Date(item.date) <= new Date(dateRange.endDate)
        : true;

      return matchesSearch && matchesDateRange;
    });

    setFilteredNotif(filtered);
  }, [searchQuery, dateRange]);

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

  return (
    <>
      <Navbar />
      <HeaderNotification onSearch={handleSearch} onDateRangeChange={handleDateRangeChange} />
      <div className="w-full flex-col lg:flex-row gap-12 px-4 lg:px-[280px] py-4 min-h-[calc(100vh-84px)] mt-3">
        {filteredNotif.length > 0 ? (
          filteredNotif.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(item)}
              className="cursor-pointer"
            >
              <div className="flex w-full space-x-4">
                <div>
                  <Bell className="bg-purple-400 w-6 h-6 text-white rounded-full p-1 mt-1" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <span className="text-slate-500 text-sm">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 text-sm">
                        {formatLongDate(item.date)}, {item.time}
                      </span>
                      <div className={`rounded-full w-2 h-2 ${getDotColor(item.type)}`}></div>
                    </div>
                  </div>
                  <h3>{item.title}</h3>
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

      {/* Modal */}
      {selectedNotif && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-[500px] relative">
            <div className="flex items-start space-x-2">
              <div
                className={`rounded-full w-3 h-3 mt-1 ${getDotColor(selectedNotif.type)}`}
              ></div>
              <h2 className="text-xl font-bold leading-tight">{selectedNotif.title}</h2>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formatLongDate(selectedNotif.date)}, {selectedNotif.time}
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