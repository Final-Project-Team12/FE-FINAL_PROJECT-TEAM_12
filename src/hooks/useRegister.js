import { useDispatch } from 'react-redux';
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
      dispatch(registerSuccess());
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
