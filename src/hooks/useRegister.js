import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  registerStart,
  registerSuccess,
  registerFailure,
  otpStart,
  otpSuccess,
  otpFailure,
} from '../store/slices/registerSlice';
import {
  register as registerService,
  verifyOtp,
  resendOtp,
} from '../services/register.service';

const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (dataUser) => {
    dispatch(registerStart());
    try {
      const response = await registerService(dataUser);
      dispatch(registerSuccess());

      await Swal.fire({
        icon: 'success',
        title: 'Yeay! Pendaftaran Sukses!',
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

      navigate('/otp');
      return response;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Registrasi gagal';
      dispatch(registerFailure(errorMessage));

      await Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: errorMessage,
        confirmButtonColor: '#7126B5',
      });
      throw error;
    }
  };

  const handleOtp = async (otpCode) => {
    dispatch(otpStart());
    try {
      const response = await verifyOtp(otpCode);
      dispatch(otpSuccess());

      await Swal.fire({
        icon: 'success',
        title: 'Verifikasi Berhasil!',
        text: 'Akun Anda telah terverifikasi',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          title: 'text-xl font-medium',
          content: 'text-gray-600',
        },
      });

      navigate('/login');
      return response;
    } catch (error) {
      const errorMessage = error?.message || 'Verifikasi OTP gagal';
      dispatch(otpFailure(errorMessage));
      throw error;
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp();

      await Swal.fire({
        icon: 'success',
        title: 'OTP Terkirim!',
        text: 'Silakan cek email Anda untuk kode OTP baru',
        showConfirmButton: false,
        timer: 1500,
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
        },
      });

      return response;
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

  return { handleRegister, handleOtp, handleResendOtp };
};

export default useRegister;
