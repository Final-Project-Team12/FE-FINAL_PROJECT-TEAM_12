import axiosInstance from '../api/axiosInstance';

const checkPaymentStatus = async (token) => {
  try {
    const response = await axiosInstance.get(`/payments/${token}/status`);
    return response.data.data.payment.status;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to check payment status';
  }
};

export default { checkPaymentStatus };
