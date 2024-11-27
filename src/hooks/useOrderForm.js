import { useState } from 'react';
import Swal from 'sweetalert2';

const NATIONALITIES = [
  { value: 'ID', label: 'Indonesia' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
];

const useOrderForm = () => {
  const [hasFamily, setHasFamily] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [formData, setFormData] = useState({
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
  });

  const handleOrderInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePassengerInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      passenger: {
        ...prev.passenger,
        [field]: value,
      },
    }));
  };

  const handlePassengerFamilyChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      passenger: {
        ...prev.passenger,
        hasFamily: checked,
        familyName: checked ? prev.passenger.familyName : '',
      },
    }));
  };

  const handleFamilyToggle = (checked) => {
    setHasFamily(checked);
    if (!checked) {
      handleOrderInputChange('orderFamily', '');
    }
  };

  const validateForm = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPhoneValid = /^\+?[\d\s-]{10,}$/.test(formData.phone);

    // Validate basic required fields
    if (!formData.orderName || !formData.phone || !formData.email) {
      Swal.fire({
        icon: 'error',
        title: 'Data Pemesan Tidak Lengkap',
        text: 'Mohon lengkapi semua data pemesan yang diperlukan',
      });
      return false;
    }

    // Validate email format
    if (!isEmailValid) {
      Swal.fire({
        icon: 'error',
        title: 'Format Email Tidak Valid',
        text: 'Mohon masukkan alamat email yang valid',
      });
      return false;
    }

    // Validate phone format
    if (!isPhoneValid) {
      Swal.fire({
        icon: 'error',
        title: 'Format Nomor Telepon Tidak Valid',
        text: 'Mohon masukkan nomor telepon yang valid',
      });
      return false;
    }

    // Validate family name if toggle is on
    if (hasFamily && !formData.orderFamily) {
      Swal.fire({
        icon: 'error',
        title: 'Data Keluarga Tidak Lengkap',
        text: 'Mohon lengkapi nama keluarga',
      });
      return false;
    }

    const passenger = formData.passenger;

    // Validate passenger required fields
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

    // Validate passenger family name if toggle is on
    if (passenger.hasFamily && !passenger.familyName) {
      Swal.fire({
        icon: 'error',
        title: 'Data Keluarga Penumpang Tidak Lengkap',
        text: 'Mohon lengkapi nama keluarga penumpang',
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

    const orderData = {
      hasFamily,
      selectedSeats,
      formData,
    };

    try {
      await saveOrderData(orderData);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data pemesanan berhasil disimpan',
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat menyimpan data',
      });
      return false;
    }
  };

  const saveOrderData = (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order Data Saved:', orderData);
        resolve();
      }, 2000);
    });
  };

  return {
    hasFamily,
    setHasFamily: handleFamilyToggle,
    selectedSeats,
    setSelectedSeats,
    formData,
    handleOrderInputChange,
    handlePassengerInputChange,
    handlePassengerFamilyChange,
    handleSubmit,
    NATIONALITIES,
  };
};

export default useOrderForm;
