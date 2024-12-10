import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';

export const register = async (dataUser) => {
  try {
    const response = await axiosInstance.post('/user', dataUser);
    Cookies.set('email', dataUser.email, { expires: 1 / 24 });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registrasi gagal' };
  }
};

export const verifyOtp = async (otpCode) => {
  try {
    const email = Cookies.get('email');
    if (!email) {
      throw new Error('Email tidak ditemukan');
    }

    const response = await axiosInstance.post('/user/verify', {
      email,
      otp: otpCode,
    });

    Cookies.remove('email');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Verifikasi OTP gagal' };
  }
};
