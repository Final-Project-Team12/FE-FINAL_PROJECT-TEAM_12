import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';

export const initiatePasswordReset = async (email) => {
  try {
    const response = await axiosInstance.post('/password/forgot-password', {
      email,
    });
    Cookies.set('resetEmail', email, { expires: 1 / 24 });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Gagal mengirim OTP' };
  }
};

export const verifyResetOtp = async (otp) => {
  try {
    const email = Cookies.get('resetEmail');
    if (!email) {
      throw new Error('Email tidak ditemukan');
    }

    const response = await axiosInstance.post('/password/confirm-otp', {
      email,
      otp,
    });

    Cookies.set('resetToken', response.data.resetToken, { expires: 1 / 24 });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Verifikasi OTP gagal' };
  }
};

export const resendResetOtp = async () => {
  try {
    const email = Cookies.get('resetEmail');
    if (!email) {
      throw new Error('Email tidak ditemukan');
    }

    const response = await axiosInstance.post('/password/forgot-password', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Gagal mengirim ulang OTP' };
  }
};

export const resetPassword = async (newPassword, confirmPassword) => {
  try {
    const email = Cookies.get('resetEmail');
    const resetToken = Cookies.get('resetToken');

    if (!email || !resetToken) {
      throw new Error('Data tidak lengkap untuk reset password');
    }

    const response = await axiosInstance.post('/password/reset-password', {
      email,
      newPassword,
      confirmPassword,
      resetToken,
    });

    Cookies.remove('resetEmail');
    Cookies.remove('resetToken');

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Gagal mereset password' };
  }
};
