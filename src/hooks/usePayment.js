import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../services/payment.service';
import {
  setTransactionData,
  setPaymentData,
  setTransactionId,
  setPaymentId,
  setLoading,
  setError,
  resetPaymentState,
} from '../store/slices/paymentSlice';
import Swal from 'sweetalert2';

export const usePayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.payment);
  const flightState = useSelector((state) => state.flightSearch);
  const { user } = useSelector((state) => state.auth);

  const createTransaction = useCallback(
    async (formData) => {
      dispatch(setLoading(true));
      try {
        const transactionData = {
          userData: {
            user_id: user.id,
          },
          passengerData: formData.passengerData.map((passenger) => ({
            title: passenger.title,
            full_name: passenger.full_name,
            family_name: passenger.family_name,
            birth_date: passenger.birth_date,
            nationality: passenger.nationality,
            id_number: passenger.id_number,
            id_issuer: passenger.id_issuer,
            id_expiry: passenger.id_expiry,
          })),
          seatSelections: formData.seatSelections,
          planeId: formData.planeId,
          total_payment: formData.total_payment,
        };

        const result = await paymentService.createTransaction(transactionData);

        if (result.isSuccess) {
          dispatch(setTransactionId(result.data.id));
          dispatch(setTransactionData(transactionData));
          dispatch(
            setPaymentData({
              amount: formData.total_payment,
              orderId: result.data.transaction_id,
            })
          );

          Swal.fire({
            icon: 'success',
            title: 'Transaction Created!',
            text: 'Your transaction was created successfully',
            timer: 1500,
            showConfirmButton: false,
          });

          return true;
        } else {
          throw new Error(result.message || 'Failed to create transaction');
        }
      } catch (error) {
        dispatch(setError(error.message));
        Swal.fire({
          icon: 'error',
          title: 'Transaction Failed',
          text: error.message || 'Failed to create transaction',
        });
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, user]
  );

  const initiatePayment = useCallback(
    async (paymentData) => {
      dispatch(setLoading(true));
      try {
        const paymentDetails = {
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          customerDetails: {
            name: state.orderData.orderName,
            email: state.orderData.email,
            mobile_number: state.orderData.phone,
            address: state.orderData.address || user.address || '',
          },
          productDetails: [
            {
              productId:
                flightState.selectedDepartureFlight.plane_id.toString(),
              productName: `Flight ${flightState.selectedDepartureFlight.plane_code}`,
              quantity: state.orderData.passengers.length,
              price: paymentData.amount / state.orderData.passengers.length,
            },
          ],
        };

        const result = await paymentService.initiatePayment(paymentDetails);

        if (result.isSuccess) {
          dispatch(setPaymentId(result.data.id));
          dispatch(
            setPaymentData({
              ...paymentDetails,
              orderId: result.orderId,
              token: result.data.data.payment.snapToken,
            })
          );

          return true;
        } else {
          throw new Error(result.message || 'Failed to initiate payment');
        }
      } catch (error) {
        dispatch(setError(error.message));
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: error.message || 'Failed to initiate payment',
        });
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, state.orderData, flightState, user]
  );

  const resetPaymentData = useCallback(() => {
    dispatch(resetPaymentState());
  }, [dispatch]);

  return {
    createTransaction,
    initiatePayment,
    resetPaymentData,
    loading: state.loading,
    error: state.error,
    transactionId: state.transactionId,
    paymentId: state.paymentId,
  };
};
