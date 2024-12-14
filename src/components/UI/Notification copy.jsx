import React, { useState } from 'react';
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
  const [filterText, setFilterText] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const handleSearchTextChange = (text) => {
    console.log('Updating Filter Text:', text); // Debugging input dari child
    setFilterText(text); // Update state
  };

  const filteredNotif = notif.filter((n) => {
    const combinedText = `${n.title} ${n.description}`.toLowerCase();
    const normalizedFilterText = filterText.trim().toLowerCase();
  
    // Debugging untuk memverifikasi input
    console.log('Filter Text:', normalizedFilterText);
  
    // Jika filterText kosong, tampilkan semua notifikasi
    if (!normalizedFilterText) {
      return true;
    }
  
    const matchesText = combinedText.includes(normalizedFilterText);
  
    const notifDate = new Date(n.date);
    const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
    const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
  
    const matchesDate =
      (!startDate || notifDate >= startDate) &&
      (!endDate || notifDate <= endDate);
  
    // Debugging hasil pencocokan
    console.log({
      title: n.title,
      matchesText,
      matchesDate,
      result: matchesText && matchesDate,
    });
  
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