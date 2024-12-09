import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';

export const register = async (dataUser) => {
  try {
    const response = await axiosInstance.post('/user', dataUser);
    Cookies.set('email', dataUser.email);
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const otp = async (otpCode) => {
  try {
    const email = Cookies.get('email');
    const response = await axiosInstance.post('/user/verify', {
      otpCode,
      email,
    });
    Cookies.remove('email');
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Verify failed' };
  }
};
