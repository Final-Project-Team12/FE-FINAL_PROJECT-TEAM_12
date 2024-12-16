import axiosInstance from '../api/axiosInstance';

export const notificationService = {
  getNotifications: async () => {
    try {
      const response = await axiosInstance.get('/notifications');
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data || { message: 'Failed to fetch notifications' }
      );
    }
  },
};
