import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';

export const register = async (dataUser) => {
  try {
    const response = await axiosInstance.post('/user', dataUser);

    Cookies.set('email', dataUser.email, { expires: 1 / 24 });
    Cookies.set('tempPassword', dataUser.password, { expires: 1 / 24 });
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
    Cookies.remove('tempPassword');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Verifikasi OTP gagal' };
  }
};

export const resendOtp = async () => {
  try {
    const email = Cookies.get('email');
    const password = Cookies.get('tempPassword');

    if (!email || !password) {
      throw new Error('Data tidak lengkap untuk mengirim ulang OTP');
    }

    const response = await axiosInstance.post('/user/resend', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Gagal mengirim ulang OTP' };
  }
};
