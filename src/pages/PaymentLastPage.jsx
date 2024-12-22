// PaymentLastPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PaymentForm from '../components/UI/PaymentForm';
import Navbar from '../components/UI/Navbar';
import Stepper from '../components/UI/Stepper';
import FlightDetails from '../components/UI/FlightDetail';
import PaymentSuccessImage from '../../public/images/Payment_Success.png';
import { resetPaymentState } from '../store/slices/paymentSlice';
import Swal from 'sweetalert2';

const PaymentLastPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { paymentData } = useSelector((state) => state.payment);

  const currentDate = new Date();
  const deadlineDate = new Date(currentDate);
  deadlineDate.setHours(deadlineDate.getHours() + 1);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formattedDeadline = deadlineDate.toLocaleString('id-ID', options);

  useEffect(() => {
    if (!paymentData?.token) {
      navigate('/', { replace: true });
    }
    document.body.style.overflow = 'auto';

    // Cleanup function to remove any duplicate snap elements
    return () => {
      document.body.style.overflow = 'auto';
      const snapEmbed = document.querySelector('.snap-embed');
      if (
        snapEmbed &&
        snapEmbed.parentElement !== document.getElementById('snap-container')
      ) {
        snapEmbed.remove();
      }
    };
  }, [paymentData?.token, navigate]);

  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);

    Swal.fire({
      icon: 'success',
      title: 'Pembayaran Berhasil!',
      text: 'Terima kasih atas pembayaran Anda',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleOrderHistory = () => {
    document.body.style.overflow = 'auto';
    dispatch(resetPaymentState());
    navigate('/orderhistory', { replace: true });
  };

  const handleNewSearch = () => {
    document.body.style.overflow = 'auto';
    dispatch(resetPaymentState());
    navigate('/', { replace: true });
  };

  if (!paymentData?.token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden mb-10">
      <Navbar />
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Stepper currentStep={isPaymentSuccess ? 3 : 2} />
          <div className="px-4 sm:px-6 lg:px-8">
            {!isPaymentSuccess ? (
              <div className="bg-red-600 text-white rounded-md p-2 sm:p-3 flex items-center justify-center space-x-2 mt-4 text-sm sm:text-base">
                <span>Selesaikan Pembayaran sampai {formattedDeadline}</span>
              </div>
            ) : (
              <div className="bg-[#73CA5C] text-white rounded-md p-3 flex items-center justify-center space-x-2 mt-4">
                <span className="font-semibold">
                  Terimakasih atas pembayaran transaksi
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {!isPaymentSuccess ? (
            <>
              <div className="lg:col-span-3">
                <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
              </div>
              <div className="lg:col-span-2">
                <FlightDetails />
              </div>
            </>
          ) : (
            <div className="lg:col-span-5">
              <div className="flex flex-col items-center justify-center text-center p-6">
                <img
                  src={PaymentSuccessImage}
                  alt="Pembayaran Berhasil"
                  className="mb-4 w-1/3 max-w-xs"
                />
                <h2 className="text-2xl font-bold">Selamat!</h2>
                <p className="text-lg mb-6">
                  Transaksi Pembayaran Tiket sukses!
                </p>
                <div className="w-full max-w-xs space-y-4">
                  <button
                    onClick={handleOrderHistory}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Terbitkan Tiket
                  </button>
                  <button
                    onClick={handleNewSearch}
                    className="w-full bg-purple-300 text-white py-3 px-6 rounded-lg hover:bg-purple-400 transition-colors"
                  >
                    Cari Penerbangan Lain
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentLastPage;
