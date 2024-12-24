import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePayment } from '../../hooks/usePayment';
import { useAuth } from '../../hooks/useAuth';
import {
  updateOrderData,
  updatePassengerData,
  setIsSubmitted,
  setSelectedDepartureSeats,
  setSelectedReturnSeats,
  setHasFamily,
} from '../../store/slices/paymentSlice';
import SeatSelection from './SeatSelection';
import DatePicker from '../Elements/DatePicker/DatePicker';
import ToggleSwitch from '../Elements/Toggle/ToggleSwitch';
import Swal from 'sweetalert2';

const NATIONALITIES = [
  { value: 'ID', label: 'Indonesia' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'SG', label: 'Singapura' },
  { value: 'US', label: 'Amerika Serikat' },
  { value: 'GB', label: 'Inggris' },
  { value: 'AU', label: 'Australia' },
  { value: 'JP', label: 'Jepang' },
  { value: 'KR', label: 'Korea Selatan' },
  { value: 'CN', label: 'China' },
  { value: 'TH', label: 'Thailand' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'PH', label: 'Filipina' },
  { value: 'DE', label: 'Jerman' },
  { value: 'FR', label: 'Perancis' },
  { value: 'NL', label: 'Belanda' },
  { value: 'IT', label: 'Italia' },
  { value: 'ES', label: 'Spanyol' },
  { value: 'RU', label: 'Rusia' },
  { value: 'CA', label: 'Kanada' },
  { value: 'BR', label: 'Brasil' },
];

const OrderForm = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { createTransaction, loading } = usePayment();

  const {
    orderData,
    selectedDepartureSeats,
    selectedReturnSeats,
    isSubmitted,
  } = useSelector((state) => state.payment);

  const {
    passengerCounts,
    selectedDepartureFlight,
    selectedReturnFlight,
    selectedSeatClass,
    isRoundTrip,
  } = useSelector((state) => state.flightSearch);

  useEffect(() => {
    dispatch(
      updateOrderData({
        orderName: '',
        email: '',
        phone: '',
        address: '',
        passengers: generatePassengerList(),
      })
    );

    dispatch(setSelectedDepartureSeats([]));
    dispatch(setSelectedReturnSeats([]));
  }, [dispatch, passengerCounts]);

  const generatePassengerList = () => {
    const passengers = [];
    const types = [
      { type: 'Adult', count: passengerCounts.adult || 0 },
      { type: 'Child', count: passengerCounts.child || 0 },
      { type: 'Infant', count: passengerCounts.infant || 0 },
    ];

    types.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        passengers.push({
          type,
          title: 'Mr.',
          fullName: '',
          hasFamily: false,
          familyName: '',
          birthDate: '',
          nationality: '',
          idNumber: '',
          issuingCountry: '',
          expiryDate: '',
        });
      }
    });

    return passengers;
  };

  const validateForm = () => {
    // Validate order information
    if (
      !orderData.orderName?.trim() ||
      !orderData.phone?.trim() ||
      !orderData.email?.trim() ||
      !orderData.address?.trim()
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Data Tidak Lengkap',
        text: 'Mohon lengkapi semua informasi pemesanan',
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email Tidak Valid',
        text: 'Mohon masukkan alamat email yang valid',
      });
      return false;
    }

    // Validate phone number format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(orderData.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Nomor Telepon Tidak Valid',
        text: 'Mohon masukkan nomor telepon yang valid',
      });
      return false;
    }

    // Validate passenger information
    for (const [index, passenger] of orderData.passengers.entries()) {
      if (
        !passenger.fullName?.trim() ||
        !passenger.birthDate ||
        !passenger.nationality ||
        !passenger.idNumber?.trim() ||
        !passenger.issuingCountry ||
        !passenger.expiryDate
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Data Penumpang Tidak Lengkap',
          text: `Mohon lengkapi semua data untuk penumpang ${index + 1}`,
        });
        return false;
      }

      if (passenger.hasFamily && !passenger.familyName?.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Nama Keluarga Kosong',
          text: `Mohon masukkan nama keluarga untuk penumpang ${index + 1}`,
        });
        return false;
      }
    }

    // Validate seat selections
    if (
      !Array.isArray(selectedDepartureSeats) ||
      selectedDepartureSeats.length !== orderData.passengers.length
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Kursi Keberangkatan Belum Dipilih',
        text: 'Mohon pilih kursi keberangkatan untuk semua penumpang',
      });
      return false;
    }

    if (
      isRoundTrip &&
      (!Array.isArray(selectedReturnSeats) ||
        selectedReturnSeats.length !== orderData.passengers.length)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Kursi Kepulangan Belum Dipilih',
        text: 'Mohon pilih kursi kepulangan untuk semua penumpang',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formattedPassengers = orderData.passengers.map((passenger) => ({
        title: passenger.title,
        fullName: passenger.fullName.trim(),
        familyName: passenger.hasFamily ? passenger.familyName.trim() : null,
        birthDate: passenger.birthDate,
        nationality: passenger.nationality,
        idNumber: passenger.idNumber.trim(),
        issuingCountry: passenger.issuingCountry,
        expiryDate: passenger.expiryDate,
      }));

      const seatSelections = selectedDepartureSeats.map((seatId) => ({
        seat_id: Number(seatId),
      }));

      let returnSeatSelections = [];
      if (isRoundTrip) {
        returnSeatSelections = selectedReturnSeats.map((seatId) => ({
          seat_id: Number(seatId),
        }));
      }

      const transactionData = {
        userData: {
          user_id: user.id,
        },
        passengerData: formattedPassengers,
        seatSelections,
        planeId: selectedDepartureFlight.plane_id,
        isRoundTrip,
      };

      if (isRoundTrip) {
        transactionData.returnPlaneId = selectedReturnFlight.plane_id;
        transactionData.returnSeatSelections = returnSeatSelections;
      }

      const success = await createTransaction(transactionData);

      if (success) {
        dispatch(setIsSubmitted(true));
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Data pesanan telah tersimpan',
        });
      }
    } catch (error) {
      console.error('Transaction error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Gagal menyimpan data pesanan',
      });
    }
  };

  const handlePassengerUpdate = (index, field, value) => {
    const updatedPassengers = [...orderData.passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    dispatch(
      updateOrderData({
        ...orderData,
        passengers: updatedPassengers,
      })
    );
  };

  const handleFamilyToggle = (index, event) => {
    const isChecked = event.target.checked;
    const updatedPassengers = [...orderData.passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      hasFamily: isChecked,
      familyName: isChecked ? updatedPassengers[index].familyName : '',
    };
    dispatch(
      updateOrderData({
        ...orderData,
        passengers: updatedPassengers,
      })
    );
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-0">
      <div className="w-full border border-gray-300 rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
          Isi Data Pemesan
        </h2>
        <div className="bg-gray-800 text-white p-3 sm:p-4 rounded-t-lg mb-6 sm:mb-8">
          <h3 className="text-base sm:text-xl font-semibold">
            Data Diri Pemesan
          </h3>
        </div>

        <form className="space-y-4 sm:space-y-6">
          <div className="flex flex-col">
            <label className="text-[#7126B5] font-semibold mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={orderData.orderName}
              onChange={(e) =>
                dispatch(updateOrderData({ orderName: e.target.value }))
              }
              placeholder="Masukkan nama lengkap"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#7126B5] font-semibold mb-2">Email</label>
            <input
              type="email"
              value={orderData.email}
              onChange={(e) =>
                dispatch(updateOrderData({ email: e.target.value }))
              }
              placeholder="Masukkan email"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#7126B5] font-semibold mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              value={orderData.phone}
              onChange={(e) =>
                dispatch(updateOrderData({ phone: e.target.value }))
              }
              placeholder="Masukkan nomor telepon"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#7126B5] font-semibold mb-2">Alamat</label>
            <textarea
              value={orderData.address}
              onChange={(e) =>
                dispatch(updateOrderData({ address: e.target.value }))
              }
              placeholder="Masukkan alamat lengkap"
              rows={3}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5] resize-none"
            />
          </div>
        </form>
      </div>

      {orderData.passengers?.map((passenger, index) => (
        <div
          key={index}
          className="w-full border border-gray-300 rounded-lg p-4 sm:p-6"
        >
          <div className="bg-gray-800 text-white p-3 sm:p-4 rounded-t-lg mb-4 sm:mb-6">
            <h3 className="text-base sm:text-xl font-semibold">
              Data Penumpang {index + 1} - {passenger.type}
            </h3>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">Title</label>
              <select
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
                value={passenger.title}
                onChange={(e) =>
                  handlePassengerUpdate(index, 'title', e.target.value)
                }
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={passenger.fullName}
                onChange={(e) =>
                  handlePassengerUpdate(index, 'fullName', e.target.value)
                }
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <ToggleSwitch
              isChecked={passenger.hasFamily}
              onChange={(e) => handleFamilyToggle(index, e)}
              label="Punya Nama Keluarga?"
            />

            {passenger.hasFamily && (
              <div className="flex flex-col mt-4">
                <label className="text-[#7126B5] font-semibold mb-2">
                  Nama Keluarga
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama keluarga"
                  value={passenger.familyName}
                  onChange={(e) =>
                    handlePassengerUpdate(index, 'familyName', e.target.value)
                  }
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
                />
              </div>
            )}

            <DatePicker
              label="Tanggal Lahir"
              value={passenger.birthDate}
              onChange={(value) =>
                handlePassengerUpdate(index, 'birthDate', value)
              }
            />

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Kewarganegaraan
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
                value={passenger.nationality}
                onChange={(e) =>
                  handlePassengerUpdate(index, 'nationality', e.target.value)
                }
              >
                <option value="">Pilih Kewarganegaraan</option>
                {NATIONALITIES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                KTP/Paspor
              </label>
              <input
                type="text"
                placeholder="Masukkan nomor KTP/Paspor"
                value={passenger.idNumber}
                onChange={(e) =>
                  handlePassengerUpdate(index, 'idNumber', e.target.value)
                }
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Negara Penerbit
              </label>
              <select
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
                value={passenger.issuingCountry}
                onChange={(e) =>
                  handlePassengerUpdate(index, 'issuingCountry', e.target.value)
                }
              >
                <option value="">Pilih Negara Penerbit</option>
                {NATIONALITIES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <DatePicker
              label="Berlaku Sampai"
              value={passenger.expiryDate}
              onChange={(value) =>
                handlePassengerUpdate(index, 'expiryDate', value)
              }
            />
          </form>
        </div>
      ))}

      <div className="w-full border border-gray-300 rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
          Pilih Kursi Keberangkatan
        </h2>
        <SeatSelection
          selectedSeats={selectedDepartureSeats}
          maxSeats={orderData.passengers?.length || 0}
          onSeatSelect={(seats) => dispatch(setSelectedDepartureSeats(seats))}
          flightData={selectedDepartureFlight}
        />
      </div>

      {isRoundTrip && (
        <div className="w-full border border-gray-300 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
            Pilih Kursi Kepulangan
          </h2>
          <SeatSelection
            selectedSeats={selectedReturnSeats}
            maxSeats={orderData.passengers?.length || 0}
            onSeatSelect={(seats) => dispatch(setSelectedReturnSeats(seats))}
            flightData={selectedReturnFlight}
          />
        </div>
      )}

      <div className="mx-auto w-full sm:w-[95%] px-4 sm:px-0">
        <button
          onClick={handleSubmit}
          disabled={isSubmitted || loading}
          className={`w-full ${
            isSubmitted || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#7126B5] hover:opacity-90'
          } text-white py-3 sm:py-4 rounded-lg text-base sm:text-xl font-semibold transition-all`}
        >
          {loading ? 'Memproses...' : 'Simpan'}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
