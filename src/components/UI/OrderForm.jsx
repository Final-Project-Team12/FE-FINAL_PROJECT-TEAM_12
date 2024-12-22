import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePayment } from '../../hooks/usePayment';
import { useAuth } from '../../hooks/useAuth';
import {
  updateOrderData,
  updatePassengerData,
  setIsSubmitted,
  setHasFamily,
  setSelectedDepartureSeats,
  setSelectedReturnSeats,
} from '../../store/slices/paymentSlice';
import SeatSelection from './SeatSelection';
import DatePicker from '../Elements/DatePicker/DatePicker';
import ToggleSwitch from '../Elements/Toggle/ToggleSwitch';
import Swal from 'sweetalert2';

const NATIONALITIES = [
  { value: 'ID', label: 'Indonesia' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
];

const OrderForm = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { createTransaction, loading } = usePayment();

  const {
    orderData,
    hasFamily,
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
    if (
      !orderData.orderName?.trim() ||
      !orderData.phone?.trim() ||
      !orderData.email?.trim() ||
      !orderData.address?.trim()
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Data',
        text: 'Please fill in all order information',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
      });
      return false;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(orderData.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone',
        text: 'Please enter a valid phone number',
      });
      return false;
    }

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
          title: 'Incomplete Passenger Data',
          text: `Please complete all required fields for passenger ${index + 1}`,
        });
        return false;
      }

      if (passenger.hasFamily && !passenger.familyName?.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Missing Family Name',
          text: `Please enter family name for passenger ${index + 1}`,
        });
        return false;
      }
    }

    if (
      !Array.isArray(selectedDepartureSeats) ||
      selectedDepartureSeats.length !== orderData.passengers.length
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Departure Seat Selection Required',
        text: 'Please select departure seats for all passengers',
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
        title: 'Return Seat Selection Required',
        text: 'Please select return seats for all passengers',
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
        full_name: passenger.fullName.trim(),
        family_name: passenger.hasFamily ? passenger.familyName.trim() : null,
        birth_date: passenger.birthDate,
        nationality: passenger.nationality,
        id_number: passenger.idNumber.trim(),
        id_issuer: passenger.issuingCountry,
        id_expiry: passenger.expiryDate,
      }));

      const departureSeatSelections = selectedDepartureSeats.map((seatId) =>
        Number(seatId)
      );

      const transactionData = {
        userData: {
          user_id: user.id,
        },
        passengerData: formattedPassengers,
        seatSelections: departureSeatSelections,
        planeId: selectedDepartureFlight.plane_id,
        is_round_trip: isRoundTrip,
        total_payment: 0,
      };

      if (isRoundTrip) {
        const returnSeatSelections = selectedReturnSeats.map((seatId) =>
          Number(seatId)
        );
        transactionData.returnPlaneId = selectedReturnFlight.plane_id;
        transactionData.returnSeatSelections = returnSeatSelections;
      }

      console.log('Submitting transaction:', transactionData);

      const success = await createTransaction(transactionData);

      if (success) {
        dispatch(setIsSubmitted(true));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Order data has been saved',
        });
      }
    } catch (error) {
      console.error('Transaction error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to save order data',
      });
    }
  };

  const handlePassengerUpdate = (index, field, value) => {
    const updatedPassengers = [...orderData.passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    dispatch(updateOrderData({ passengers: updatedPassengers }));
  };

  return (
    <div className="mt-4 space-y-6 w-full">
      {/* Order Information Section */}
      <div className="w-full border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Isi Data Pemesan</h2>
        <div className="bg-gray-800 text-white p-4 rounded-t-lg mb-8">
          <h3 className="text-xl font-semibold">Data Diri Pemesan</h3>
        </div>

        <form className="space-y-6">
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
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
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
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
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
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#7126B5] font-semibold mb-2">Alamat</label>
            <textarea
              value={orderData.address}
              onChange={(e) =>
                dispatch(updateOrderData({ address: e.target.value }))
              }
              placeholder="Enter full address"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5] resize-none"
            />
          </div>
        </form>
      </div>

      {/* Passenger Information Section */}
      {orderData.passengers?.map((passenger, index) => (
        <div
          key={index}
          className="w-full border border-gray-300 rounded-lg p-6"
        >
          <div className="bg-gray-800 text-white p-4 rounded-t-lg mb-6">
            <h3 className="text-xl font-semibold">
              Data Penumpang {index + 1} - {passenger.type}
            </h3>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">Title</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
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
                placeholder="Enter full name"
                value={passenger.fullName}
                onChange={(e) =>
                  handlePassengerUpdate(index, 'fullName', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <ToggleSwitch
              isChecked={passenger.hasFamily}
              onChange={(e) => {
                handlePassengerUpdate(index, 'hasFamily', e.target.checked);
                if (!e.target.checked) {
                  handlePassengerUpdate(index, 'familyName', '');
                }
              }}
              label="Punya Nama Keluarga?"
            />

            {passenger.hasFamily && (
              <div className="flex flex-col">
                <label className="text-[#7126B5] font-semibold mb-2">
                  Nama Keluarga
                </label>
                <input
                  type="text"
                  placeholder="Enter family name"
                  value={passenger.familyName}
                  onChange={(e) =>
                    handlePassengerUpdate(index, 'familyName', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
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
                placeholder="Enter ID/Passport number"
                value={passenger.idNumber}
                onChange={(e) =>
                  handlePassengerUpdate(index, 'idNumber', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Negara Penerbit
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
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

      {/* Departure Seat Selection Section */}
      <div className="w-full border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Choose Departure Seats</h2>
        <SeatSelection
          selectedSeats={selectedDepartureSeats}
          maxSeats={orderData.passengers?.length || 0}
          onSeatSelect={(seats) => dispatch(setSelectedDepartureSeats(seats))}
          flightData={selectedDepartureFlight}
        />
      </div>

      {/* Return Seat Selection Section - Only shown for round trips */}
      {isRoundTrip && (
        <div className="w-full border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Choose Return Seats</h2>
          <SeatSelection
            selectedSeats={selectedReturnSeats}
            maxSeats={orderData.passengers?.length || 0}
            onSeatSelect={(seats) => dispatch(setSelectedReturnSeats(seats))}
            flightData={selectedReturnFlight}
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="mx-auto w-[95%]">
        <button
          onClick={handleSubmit}
          disabled={isSubmitted || loading}
          className={`w-full max-w-2xl ${
            isSubmitted || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#7126B5] hover:opacity-90'
          } text-white py-4 rounded-lg text-xl font-semibold transition-all`}
        >
          {loading ? 'Processing...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
