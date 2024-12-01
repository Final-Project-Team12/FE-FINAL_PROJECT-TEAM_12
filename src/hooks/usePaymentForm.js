import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
  updateOrderData,
  updatePassengerData,
  setHasFamily,
  setIsSubmitted,
  setSelectedSeats,
} from '../store/slices/paymentSlice';
import { saveOrderData } from '../services/flight.service';

export const NATIONALITIES = [
  { value: 'ID', label: 'Indonesia' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'JP', label: 'Japan' },
];

export const usePaymentForm = () => {
  const dispatch = useDispatch();
  const { orderData, hasFamily, selectedSeats, isSubmitted } = useSelector(
    (state) => state.payment
  );

  const handleOrderInputChange = (field, value) => {
    dispatch(updateOrderData({ [field]: value }));
  };

  const handlePassengerInputChange = (field, value) => {
    dispatch(updatePassengerData({ [field]: value }));
  };

  const handlePassengerFamilyChange = (checked) => {
    dispatch(
      updatePassengerData({
        hasFamily: checked,
        familyName: checked ? orderData.passenger.familyName : '',
      })
    );
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateForm = () => {
    // Validate order data
    if (!orderData.orderName || !orderData.phone || !orderData.email) {
      Swal.fire({
        icon: 'error',
        title: 'Data Pemesan Tidak Lengkap',
        text: 'Mohon lengkapi semua data pemesan yang diperlukan',
      });
      return false;
    }

    if (!validateEmail(orderData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Format Email Tidak Valid',
        text: 'Mohon masukkan alamat email yang valid',
      });
      return false;
    }

    if (!validatePhone(orderData.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Format Nomor Telepon Tidak Valid',
        text: 'Mohon masukkan nomor telepon yang valid (minimal 10 digit)',
      });
      return false;
    }

    if (hasFamily && !orderData.orderFamily) {
      Swal.fire({
        icon: 'error',
        title: 'Data Keluarga Tidak Lengkap',
        text: 'Mohon lengkapi nama keluarga',
      });
      return false;
    }

    // Validate passenger data
    const passenger = orderData.passenger;
    if (
      !passenger.fullName ||
      !passenger.birthDate ||
      !passenger.nationality ||
      !passenger.idNumber ||
      !passenger.issuingCountry ||
      !passenger.expiryDate
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Data Penumpang Tidak Lengkap',
        text: 'Mohon lengkapi semua data penumpang yang diperlukan',
      });
      return false;
    }

    if (passenger.hasFamily && !passenger.familyName) {
      Swal.fire({
        icon: 'error',
        title: 'Data Keluarga Penumpang Tidak Lengkap',
        text: 'Mohon lengkapi nama keluarga penumpang',
      });
      return false;
    }

    // Validate expiry date
    const today = new Date();
    const expiryDate = new Date(passenger.expiryDate);
    if (expiryDate <= today) {
      Swal.fire({
        icon: 'error',
        title: 'Dokumen Telah Kadaluarsa',
        text: 'Tanggal berlaku dokumen harus lebih dari hari ini',
      });
      return false;
    }

    // Validate birth date
    const birthDate = new Date(passenger.birthDate);
    if (birthDate >= today) {
      Swal.fire({
        icon: 'error',
        title: 'Tanggal Lahir Tidak Valid',
        text: 'Tanggal lahir tidak boleh lebih dari hari ini',
      });
      return false;
    }

    // Validate seat selection
    if (selectedSeats.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Kursi Belum Dipilih',
        text: 'Mohon pilih kursi terlebih dahulu',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return false;
    }

    const orderDataToSubmit = {
      hasFamily,
      selectedSeats,
      formData: orderData,
    };

    try {
      const response = await saveOrderData(orderDataToSubmit);

      if (response.isSuccess) {
        dispatch(setIsSubmitted(true));
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Data pemesanan berhasil disimpan',
          showConfirmButton: false,
          timer: 1500,
        });
        return true;
      } else {
        throw new Error(response.message || 'Failed to save order');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan saat menyimpan data',
      });
      return false;
    }
  };

  const resetForm = () => {
    dispatch(
      updateOrderData({
        orderName: '',
        orderFamily: '',
        phone: '',
        email: '',
        passenger: {
          hasFamily: false,
          title: 'Mr.',
          fullName: '',
          familyName: '',
          birthDate: '',
          nationality: '',
          idNumber: '',
          issuingCountry: '',
          expiryDate: '',
        },
      })
    );
    dispatch(setHasFamily(false));
    dispatch(setSelectedSeats([]));
    dispatch(setIsSubmitted(false));
  };

  return {
    hasFamily,
    setHasFamily: (value) => dispatch(setHasFamily(value)),
    selectedSeats,
    setSelectedSeats: (seats) => dispatch(setSelectedSeats(seats)),
    orderData,
    handleOrderInputChange,
    handlePassengerInputChange,
    handlePassengerFamilyChange,
    handleSubmit,
    resetForm,
    NATIONALITIES,
    isSubmitted,
  };
};
