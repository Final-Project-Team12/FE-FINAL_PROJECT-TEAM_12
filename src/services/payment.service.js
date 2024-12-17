import axiosInstance from '../api/axiosInstance';

const generateRandomId = () => {
  const timestamp = new Date().getTime();
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `order_${timestamp}_${randomStr}`;
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
