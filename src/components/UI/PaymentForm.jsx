import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/payment.service';
import { resetPaymentState } from '../../store/slices/paymentSlice';
import Swal from 'sweetalert2';

const PaymentForm = ({ onPaymentSuccess }) => {
  const { paymentData } = useSelector((state) => state.payment);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let snapScript;
    const existingScript = document.querySelector(
      'script[src="https://app.sandbox.midtrans.com/snap/snap.js"]'
    );

    const initializeSnap = () => {
      if (paymentData?.token && !existingScript) {
        snapScript = document.createElement('script');
        snapScript.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        snapScript.setAttribute(
          'data-client-key',
          import.meta.env.VITE_MIDTRANS_CLIENT_KEY
        );
        snapScript.onload = () => {
          const snapContainer = document.getElementById('snap-container');
          if (snapContainer) {
            snapContainer.innerHTML = '';
          }

          window.snap.embed(paymentData.token, {
            embedId: 'snap-container',
            onSuccess: function (result) {
              onPaymentSuccess();
              document.body.style.overflow = 'auto';
            },
            onPending: function (result) {
              console.log('pending', result);
            },
            onError: function (result) {
              console.log('error', result);
              document.body.style.overflow = 'auto';
              handlePaymentError();
            },
            onClose: function () {
              document.body.style.overflow = 'auto';
            },
          });
        };
        document.head.appendChild(snapScript);
      } else if (paymentData?.token && existingScript && window.snap) {
        const snapContainer = document.getElementById('snap-container');
        if (snapContainer) {
          snapContainer.innerHTML = '';
        }

        window.snap.embed(paymentData.token, {
          embedId: 'snap-container',
          onSuccess: function (result) {
            onPaymentSuccess();
            document.body.style.overflow = 'auto';
          },
          onPending: function (result) {
            console.log('pending', result);
          },
          onError: function (result) {
            console.log('error', result);
            document.body.style.overflow = 'auto';
            handlePaymentError();
          },
          onClose: function () {
            document.body.style.overflow = 'auto';
          },
        });
      }
    };

    initializeSnap();

    return () => {
      if (snapScript && document.head.contains(snapScript)) {
        document.head.removeChild(snapScript);
      }
      const snapContainer = document.getElementById('snap-container');
      if (snapContainer) {
        snapContainer.innerHTML = '';
      }
      document.body.style.overflow = 'auto';
    };
  }, [paymentData?.token, onPaymentSuccess]);

  const handlePaymentError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Pembayaran Gagal',
      text: 'Terjadi kesalahan dalam proses pembayaran',
      showConfirmButton: true,
      confirmButtonText: 'Kembali ke Beranda',
    }).then(() => {
      dispatch(resetPaymentState());
      navigate('/', { replace: true });
    });
  };

  const handleCancelPayment = async () => {
    try {
      if (paymentData.orderId) {
        Swal.fire({
          title: 'Apakah anda yakin?',
          text: 'Pembayaran akan dibatalkan',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, batalkan!',
          cancelButtonText: 'Tidak',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const cancelResult = await paymentService.cancelPayment(
              paymentData.orderId
            );
            if (cancelResult.isSuccess) {
              dispatch(resetPaymentState());
              Swal.fire({
                icon: 'success',
                title: 'Pembayaran Dibatalkan',
                text: 'Pembayaran anda telah dibatalkan',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                navigate('/', { replace: true });
              });
            }
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal membatalkan pembayaran',
      });
    }
  };

  return (
    <div className="w-full mx-auto border border-gray-300 rounded-lg p-6">
      <div id="snap-container" className="w-full h-[600px] overflow-hidden">
        {!paymentData?.token && (
          <div className="flex items-center justify-center h-full">
            <p>Loading payment...</p>
          </div>
        )}
      </div>
      <button
        onClick={handleCancelPayment}
        className="w-full mt-4 bg-[#FF1700] text-white py-2 rounded-full hover:bg-red-600 transition-colors"
      >
        Batalkan Pembayaran
      </button>
    </div>
  );
};

export default PaymentForm;
