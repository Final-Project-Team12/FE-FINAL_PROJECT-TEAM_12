import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      const { accessToken } = response.data;

      const decodedToken = jwtDecode(accessToken);

      Cookies.set('token', accessToken, { expires: 7 });

      const user = {
        id: decodedToken.user_id,
        email: decodedToken.user_email,
      };

      Cookies.set('user', JSON.stringify(user), { expires: 7 });

      return {
        user,
        decodedToken,
      };
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
  },

  isAuthenticated: () => {
    const token = Cookies.get('token');
    const userStr = Cookies.get('user');

    if (!token || !userStr) return false;

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        authService.logout();
        return false;
      }
      return true;
    } catch {
      authService.logout();
      return false;
    }
  },

  getCurrentUser: () => {
    if (!authService.isAuthenticated()) return null;

    try {
      const userStr = Cookies.get('user');
      return JSON.parse(userStr);
    } catch {
      authService.logout();
      return null;
    }
  },
};
