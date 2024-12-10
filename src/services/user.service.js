import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';

export const userService = {
  getUserById: async (userId) => {
    try {
      const token = Cookies.get('token');
      const response = await axiosInstance.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user data' };
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const token = Cookies.get('token');
      const response = await axiosInstance.put(`/user/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user data' };
    }
  },

  deleteUser: async (userId) => {
    try {
      const token = Cookies.get('token');
      const response = await axiosInstance.delete(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: 'Failed to delete user account' }
      );
    }
  },
};
