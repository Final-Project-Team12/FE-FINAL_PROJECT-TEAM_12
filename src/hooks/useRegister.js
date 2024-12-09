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
import { useLocation, useNavigate } from 'react-router-dom';

const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (dataUser) => {
    dispatch(registerStart());
    try {
      const response = await registerService(dataUser);
      dispatch(registerSuccess());
      if (registerSuccess()) {
        navigate('/otp');
      }
      return response;
    } catch (error) {
      dispatch(registerFailure(error.message || 'Registration failed'));
      throw error;
    }
  };
};
