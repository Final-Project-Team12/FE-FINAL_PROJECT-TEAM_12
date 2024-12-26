import axiosInstance from '../api/axiosInstance';

const generateRandomId = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const paymentService = {
  createTransaction: async (transactionData) => {
    try {
      const cleanedData = {
        userData: transactionData.userData,
        passengerData: transactionData.passengerData.map((passenger) => ({
          title: passenger.title,
          full_name: passenger.full_name,
          family_name: passenger.family_name || undefined,
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

      console.log('Sending cleaned transaction data:', cleanedData);

      const response = await axiosInstance.post('/transaction', cleanedData);
      return {
        isSuccess: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Transaction creation error:', error.response || error);
      return {
        isSuccess: false,
        message:
          error.response?.data?.message || 'Failed to create transaction',
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
        productDetails: paymentDetails.productDetails.map((product) => ({
          productId: product.productId,
          productName: product.productName,
          quantity: product.quantity,
          price: product.price,
        })),
      };

      const response = await axiosInstance.post('/payments', paymentData);
      return {
        isSuccess: true,
        data: response.data,
        orderId: paymentData.orderId,
      };
    } catch (error) {
      console.error('Payment Error:', error.response?.data || error);
      return {
        isSuccess: false,
        message: error.response?.data?.message || 'Failed to initiate payment',
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
