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

      return {
        user: {
          id: decodedToken.user_id,
          email: decodedToken.user_email,
        },
        decodedToken,
      };
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout: () => {
    Cookies.remove('token', { path: '/' });
  },

  clearAuth: () => {
    Cookies.remove('token', { path: '/' });
  },

  isAuthenticated: () => {
    const token = Cookies.get('token');
    if (!token) return false;

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
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      return {
        id: decodedToken.user_id,
        email: decodedToken.user_email,
      };
    } catch {
      authService.logout();
      return null;
    }
  },
};
