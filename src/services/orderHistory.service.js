import axiosInstance from '../api/axiosInstance';

const orderHistoryService = {
  getOrderHistory: async (id) => {
    try {
      const response = await axiosInstance.get(`/transaction/user/${id}`);
      return response.data.data.map((transaction) => ({
        ...transaction,
        // Add isRoundTrip flag if it exists in any ticket's plane data
        isRoundTrip: transaction.tickets.some(
          (ticket) => ticket.plane?.returnPlaneId
        ),
        // Group tickets by direction (outbound/return)
        outboundTickets: transaction.tickets.filter(
          (ticket) => !ticket.plane?.returnPlaneId
        ),
        returnTickets: transaction.tickets.filter(
          (ticket) => ticket.plane?.returnPlaneId
        ),
      }));
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order history';
    }
  },
};

export default orderHistoryService;
