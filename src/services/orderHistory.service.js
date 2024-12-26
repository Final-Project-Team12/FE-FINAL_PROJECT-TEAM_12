import axiosInstance from '../api/axiosInstance';
const orderHistoryService = {
  getOrderHistory: async (id) => {
    try {
      const response = await axiosInstance.get(`/transaction/user/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order history';
    }
  },
};
export default orderHistoryService;
