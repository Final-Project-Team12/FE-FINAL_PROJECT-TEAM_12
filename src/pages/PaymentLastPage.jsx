import { useState } from 'react';
import PaymentForm from '../components/UI/PaymentForm';
import Navbar from '../components/UI/Navbar';
import Stepper from '../components/UI/Stepper';
import FlightDetails from '../components/UI/FlightDetail';
import PaymentSuccessImage from '../../public/images/Payment_Success.png';
import { useNavigate } from 'react-router-dom';

const PaymentLastPage = () => {
  const navigate = useNavigate();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const currentDate = new Date();
  const deadlineDate = new Date(currentDate);
  deadlineDate.setHours(12, 0, 0, 0);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formattedDeadline = deadlineDate.toLocaleString('id-ID', options);

  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden mb-10">
      <Navbar />
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Stepper currentStep={isPaymentSuccess ? 3 : 2} />
          {!isPaymentSuccess ? (
            <div className="bg-red-600 text-white rounded-md p-3 flex items-center justify-center space-x-2">
              <span>Selesaikan Pembayaran sampai {formattedDeadline}</span>
            </div>
          ) : (
            <div className="bg-[#73CA5C] text-white rounded-md p-3 flex items-center justify-center space-x-2">
              <span className="font-semibold">
                Terimakasih atas pembayaran transaksi
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 flex space-x-8 mt-8 justify-center">
        {!isPaymentSuccess ? (
          <>
            <div className="flex flex-col space-y-4 w-1/2">
              <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
            </div>
            <div className="w-[450px]">
              <FlightDetails />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-center p-6">
            <img
              src={PaymentSuccessImage}
              alt="Pembayaran Berhasil"
              className="mb-4 w-1/3"
            />
            <h2 className="text-2xl font-bold">Selamat!</h2>
            <p className="text-lg">Transaksi Pembayaran Tiket sukses!</p>
            <button className="mt-4 bg-purple-600 text-white py-3 px-6 rounded-lg w-full max-w-xs">
              Terbitkan Tiket
            </button>
            <button
              className="mt-2 bg-purple-300 text-white py-3 px-6 rounded-lg w-full max-w-xs"
              onClick={() => navigate('/')}
            >
              Cari Penerbangan Lain
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentLastPage;
