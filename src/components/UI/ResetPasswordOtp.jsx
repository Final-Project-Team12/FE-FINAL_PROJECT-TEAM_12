import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Elements/Buttons/Button';
import backIcon from '../../../public/icons/fi_arrow-left-black.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useResetPassword from '../../hooks/useResetPassword';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ResetPasswordOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(60);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { handleResetOtp, handleResendResetOtp } = useResetPassword();
  const loading = useSelector((state) => state.resetPassword.loading);
  const email = Cookies.get('resetEmail');

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    const expiryTime = localStorage.getItem('resetOtpExpiryTime');
    if (expiryTime) {
      const remainingTime = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000)
      );
      setTimeLeft(remainingTime);
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`reset-otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      document.getElementById(`reset-otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrorMessage('Masukkan 6 digit kode OTP');
      return;
    }

    try {
      setErrorMessage('');
      await handleResetOtp(otpString);
    } catch (error) {
      setErrorMessage(error.message || 'Kode OTP tidak valid');
    }
  };

  const handleResend = async () => {
    try {
      await handleResendResetOtp();
      const newExpiryTime = Date.now() + 60000;
      localStorage.setItem('resetOtpExpiryTime', newExpiryTime);
      setTimeLeft(60);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Gagal mengirim ulang OTP');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[90%] sm:max-w-md relative bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
        <Link to="/login" className="inline-block">
          <img
            src={backIcon}
            alt="Back"
            className="cursor-pointer mb-4 sm:mb-6 w-6 h-6 sm:w-8 sm:h-8"
          />
        </Link>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">
          Masukkan OTP
        </h2>

        <div className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base">
            Ketik 6 digit kode yang dikirimkan ke
          </p>
          <p className="font-bold mt-1 text-sm sm:text-base break-all">
            {email}
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`reset-otp-input-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-8 h-8 sm:w-12 sm:h-12 text-center text-base sm:text-xl border border-gray-300 rounded-lg sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          ))}
        </div>

        <div className="text-center mb-6 sm:mb-8">
          {timeLeft > 0 ? (
            <p className="text-xs sm:text-sm text-gray-500">
              Kirim Ulang OTP dalam{' '}
              <span className="font-bold">{timeLeft} detik</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-red-500 font-bold text-sm sm:text-base hover:underline"
              disabled={loading}
            >
              Kirim Ulang
            </button>
          )}
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          className="h-10 sm:h-12 w-full text-sm sm:text-base"
          disabled={loading || otp.join('').length !== 6}
        >
          {loading ? 'Memverifikasi...' : 'Verifikasi'}
        </Button>

        {errorMessage && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-full max-w-md px-2 sm:px-4">
            <div className="p-2 sm:p-3 text-xs sm:text-sm text-white text-center bg-red-500 font-medium rounded-lg shadow-lg">
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordOtp;
