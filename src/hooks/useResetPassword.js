import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetOtpStart,
  resetOtpSuccess,
  resetOtpFailure,
  resetState,
} from '../store/slices/resetPasswordSlice';
import {
  initiatePasswordReset,
  verifyResetOtp,
  resendResetOtp,
  resetPassword,
} from '../services/resetPassword.service';

const useResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = async (email) => {
    dispatch(resetPasswordStart());
    try {
      await initiatePasswordReset(email);
      dispatch(resetPasswordSuccess());

      await Swal.fire({
        icon: 'success',
        title: 'OTP Terkirim!',
        text: 'Silakan cek email Anda untuk kode OTP',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
        },
      });

      navigate('/otp-password');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Gagal mengirim OTP';
      dispatch(resetPasswordFailure(errorMessage));
      throw error;
    }
  };

  const handleResetOtp = async (otpCode) => {
    dispatch(resetOtpStart());
    try {
      await verifyResetOtp(otpCode);
      dispatch(resetOtpSuccess());

      await Swal.fire({
        icon: 'success',
        title: 'Verifikasi Berhasil!',
        text: 'Silakan reset password Anda',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
        },
      });

      navigate('/reset-password');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Verifikasi OTP gagal';
      dispatch(resetOtpFailure(errorMessage));
      throw error;
    }
  };

  const handleResendResetOtp = async () => {
    try {
      await resendResetOtp();

      await Swal.fire({
        icon: 'success',
        title: 'OTP Terkirim!',
        text: 'Silakan cek email Anda untuk kode OTP baru',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
        },
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim OTP',
        text: error?.response?.data?.message || 'Gagal mengirim ulang kode OTP',
        confirmButtonColor: '#7126B5',
      });
      throw error;
    }
  };

  const handleResetPassword = async (newPassword, confirmPassword) => {
    dispatch(resetPasswordStart());
    try {
      await resetPassword(newPassword, confirmPassword);
      dispatch(resetPasswordSuccess());

      await Swal.fire({
        icon: 'success',
        title: 'Password Berhasil Direset!',
        text: 'Silakan login dengan password baru Anda',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl text-gray-800 font-medium',
          content: 'text-gray-600',
        },
      });

      dispatch(resetState());

      navigate('/login');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Gagal mereset password';
      dispatch(resetPasswordFailure(errorMessage));
      throw error;
    }
  };

  const clearResetPasswordState = () => {
    dispatch(resetState());
  };

  return {
    handleForgotPassword,
    handleResetOtp,
    handleResendResetOtp,
    handleResetPassword,
    clearResetPasswordState,
  };
};

export default useResetPassword;
