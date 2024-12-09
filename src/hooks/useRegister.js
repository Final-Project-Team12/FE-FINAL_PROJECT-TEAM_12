import { useDispatch } from 'react-redux';
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
  otp as otpService,
} from '../services/register.service';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (dataUser) => {
    dispatch(registerStart());
    try {
      const response = await registerService(dataUser);
      console.log('tesss', response);
      dispatch(registerSuccess());
      await Swal.fire({
        icon: 'success',
        title: 'Yeay! Pendaftaran Sukses!',
        text: 'Anda baru saja membuka pintu menuju pengalaman baru. Selamat datang di platform kami!',
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
      dispatch(
        registerFailure(error.response?.data?.message || 'Registration failed')
      );
      throw error;
    }
  };

  const handleOtp = async (otpCode) => {
    dispatch(otpStart());
    try {
      const response = await otpService(otpCode);
      dispatch(otpSuccess());
      navigate('/login');

      return response;
    } catch (error) {
      dispatch(
        otpFailure(error.response?.data?.message || 'OTP verification failed')
      );
      throw error;
    }
  };

  return { handleRegister, handleOtp };
};

export default useRegister;
