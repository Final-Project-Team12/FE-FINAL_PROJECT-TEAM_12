import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useOrderPayment } from './useOrderPayment';
import { setPaymentData } from '../store/slices/paymentSlice';
import Swal from 'sweetalert2';

export const usePaymentHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { initiateOrderPayment, loading } = useOrderPayment();

  const handlePayment = async (flightDetails, totalPayment, user) => {
    if (!flightDetails?.plane_code) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Flight Details',
        text: 'Flight information is missing or invalid',
      });
      return false;
    }

    try {
      const paymentResult = await initiateOrderPayment({
        amount: totalPayment,
        customerDetails: {
          name: user.name,
          email: user.email,
          mobile_number: user.telephone_number,
          address: user.address,
        },
        productDetails: [
          {
            productId: flightDetails.plane_id?.toString(),
            productName: `Flight ${flightDetails.plane_code}`,
            quantity: 1,
            price: totalPayment,
          },
        ],
      });

      if (paymentResult.success) {
        dispatch(
          setPaymentData({
            token: paymentResult.token,
            orderId: paymentResult.orderId,
            amount: totalPayment,
            customerDetails: {
              name: user.name,
              email: user.email,
              mobile_number: user.telephone_number,
              address: user.address,
            },
          })
        );

        navigate(`/payment/${paymentResult.orderId}`);
        return true;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message || 'Failed to process payment',
      });
      return false;
    }
  };

  return { handlePayment, loading };
};
