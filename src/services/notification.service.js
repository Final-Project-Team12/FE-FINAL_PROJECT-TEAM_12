import axiosInstance from '../api/axiosInstance';

export const notificationService = {
  getNotifications: async () => {
    try {
      const response = await axiosInstance.get('/notifications');
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }
      throw (
        error.response?.data || { message: 'Failed to fetch notifications' }
      );
    }
  },

  markAsRead: async (notificationId) => {
    try {
      const response = await axiosInstance.put(
        `/notifications/${notificationId}/read`
      );
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }
      throw (
        error.response?.data || {
          message: 'Failed to mark notification as read',
        }
      );
    }
  },
};
