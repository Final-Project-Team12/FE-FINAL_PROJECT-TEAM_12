import axiosInstance from '../api/axiosInstance';

const generateRandomId = () => {
  const timestamp = new Date().getTime();
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `${timestamp}_${randomStr}`;
};

export const paymentService = {
  createTransaction: async (transactionData) => {
    try {
      if (!transactionData.userData?.user_id) {
        throw new Error('User ID is required');
      }

      if (
        !Array.isArray(transactionData.passengerData) ||
        transactionData.passengerData.length === 0
      ) {
        throw new Error('Passenger data is required');
      }

      const cleanedData = {
        userData: transactionData.userData,
        passengerData: transactionData.passengerData.map((passenger) => ({
          title: passenger.title,
          full_name: passenger.full_name,
          family_name: passenger.family_name,
          birth_date: passenger.birth_date,
          nationality: passenger.nationality,
          id_number: passenger.id_number,
          id_issuer: passenger.id_issuer,
          id_expiry: passenger.id_expiry,
        })),
        seatSelections: transactionData.seatSelections,
        planeId: transactionData.planeId,
        isRoundTrip: transactionData.isRoundTrip,
      };

      if (transactionData.isRoundTrip) {
        cleanedData.returnPlaneId = transactionData.returnPlaneId;
        cleanedData.returnSeatSelections = transactionData.returnSeatSelections;
      }

      console.log('Sending transaction data:', cleanedData);

      const response = await axiosInstance.post('/transaction', cleanedData);

      return {
        isSuccess: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Transaction creation error:', error);

      if (error.code === 'ERR_NETWORK') {
        return {
          isSuccess: false,
          message: 'Koneksi gagal, silakan periksa koneksi internet Anda',
        };
      }

      if (error.response?.status === 422) {
        return {
          isSuccess: false,
          message: 'Data yang diinput tidak valid, silakan periksa kembali',
        };
      }

      return {
        isSuccess: false,
        message: error.message || 'Gagal membuat transaksi, silakan coba lagi',
      };
    }
  },

  initiatePayment: async (paymentDetails) => {
    try {
      const orderId = generateRandomId();
      const paymentData = {
        orderId,
        amount: paymentDetails.amount,
        customerDetails: {
          name: paymentDetails.customerDetails.name,
          email: paymentDetails.customerDetails.email,
          mobile_number: paymentDetails.customerDetails.mobile_number,
          address: paymentDetails.customerDetails.address || '',
        },
        productDetails: paymentDetails.productDetails,
      };

      const response = await axiosInstance.post('/payments', paymentData);
      return {
        isSuccess: true,
        data: response.data,
        orderId: paymentData.orderId,
      };
    } catch (error) {
      console.error('Payment Error:', error);

      if (error.code === 'ERR_NETWORK') {
        return {
          isSuccess: false,
          message: 'Koneksi gagal, silakan periksa koneksi internet Anda',
        };
      }

      return {
        isSuccess: false,
        message: error.message || 'Gagal memulai pembayaran, silakan coba lagi',
      };
    }
  },

  getPaymentStatus: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/payments/${orderId}/status`);
      return {
        isSuccess: true,
        data: response.data,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message:
          error.response?.data?.message || 'Failed to get payment status',
      };
    }
  },

  cancelPayment: async (orderId) => {
    try {
      const response = await axiosInstance.post(`/payments/${orderId}/cancel`);
      return {
        isSuccess: true,
        data: response.data,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.response?.data?.message || 'Failed to cancel payment',
      };
    }
  },
};
