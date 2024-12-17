import axiosInstance from '../api/axiosInstance';

const generateRandomId = () => {
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `order_${randomStr}`;
};

export const paymentService = {
  createTransaction: async (transactionData) => {
    try {
      const response = await axiosInstance.post(
        '/transaction',
        transactionData
      );
      return {
        isSuccess: true,
        data: response.data,
      };
    } catch (error) {
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
        ...paymentDetails,
      };

      const response = await axiosInstance.post('/payments', paymentData);
      return {
        isSuccess: true,
        data: response.data,
        orderId,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: error.response?.data?.message || 'Failed to initiate payment',
      };
    }
  },
};
