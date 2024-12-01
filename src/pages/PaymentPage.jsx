import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Clock, CheckCircle } from 'lucide-react';
import { updateTimeLeft } from '../store/slices/paymentSlice';
import Navbar from '../components/UI/Navbar';
import Stepper from '../components/UI/Stepper';
import OrderForm from '../components/UI/OrderForm';
import FlightDetails from '../components/UI/FlightDetail';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { timeLeft, isSubmitted: showSuccess } = useSelector(
    (state) => state.payment
  );

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimeLeft(timeLeft <= 0 ? 0 : timeLeft - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden mb-10">
      <Navbar />
      <div className="w-full bg-white rounded-lg shadow-[0px_2px_10px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Stepper currentStep={showSuccess ? 2 : 1} />
          <div className="px-10">
            {!showSuccess ? (
              <div className="bg-red-600 text-white rounded-md p-3 flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Selesaikan dalam</span>
                <span className="font-bold">{formatTime(timeLeft)}</span>
              </div>
            ) : (
              <div className="bg-green-500 text-white rounded-md p-3 flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-bold">Data Anda berhasil tersimpan!</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 flex space-x-6 mt-8 justify-center">
        <div className="flex flex-col space-y-4 w-1/2">
          <OrderForm />
        </div>
        <div className="w-[450px] mt-4">
          <FlightDetails />
          {showSuccess && (
            <button
              onClick={handleProceedToPayment}
              className="w-full max-w-2xl bg-red-600 text-white py-4 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity mt-4"
            >
              Lanjut Bayar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
