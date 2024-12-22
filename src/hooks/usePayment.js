// usePayment.js
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

  const calculateTotalWithTax = useCallback(
    (formData) => {
      try {
        // Get seat prices based on selected class
        const departureSeat =
          flightState.selectedDepartureFlight.seats_detail.find(
            (seat) => seat.class === flightState.selectedSeatClass
          );
        const returnSeat = flightState.isRoundTrip
          ? flightState.selectedReturnFlight?.seats_detail.find(
              (seat) => seat.class === flightState.selectedSeatClass
            )
          : null;

        const departureSeatPrice = departureSeat?.price || 0;
        const returnSeatPrice = returnSeat?.price || 0;

        // Calculate base amount per passenger
        const totalBasePrice =
          departureSeatPrice + (flightState.isRoundTrip ? returnSeatPrice : 0);

        // Calculate total for all passengers
        const totalPassengerPrice =
          totalBasePrice * formData.passengerData.length;

        // Calculate tax (10%)
        const tax = Math.round(totalPassengerPrice * 0.1);

        // Calculate final total
        const totalPayment = totalPassengerPrice + tax;

        console.log('Payment calculation:', {
          departureSeatPrice,
          returnSeatPrice,
          totalBasePrice,
          passengerCount: formData.passengerData.length,
          totalPassengerPrice,
          tax,
          totalPayment,
        });

        return totalPayment;
      } catch (error) {
        console.error('Error calculating total:', error);
        throw error;
      }
    },
    [flightState]
  );

  const validateSeatSelections = useCallback(
    (seatSelections, passengerCount) => {
      if (
        !Array.isArray(seatSelections) ||
        seatSelections.length !== passengerCount
      ) {
        throw new Error('Invalid seat selection count');
      }

      return seatSelections.every((seatId) => {
        const numericSeatId = Number(seatId);
        return !isNaN(numericSeatId) && numericSeatId > 0;
      });
    },
    []
  );

  const createTransaction = useCallback(
    async (formData) => {
      dispatch(setLoading(true));
      try {
        // Validate seat selections
        const passengerCount = formData.passengerData.length;

        if (!validateSeatSelections(formData.seatSelections, passengerCount)) {
          throw new Error('Invalid seat selections');
        }

        if (
          flightState.isRoundTrip &&
          !validateSeatSelections(formData.returnSeatSelections, passengerCount)
        ) {
          throw new Error('Invalid return seat selections');
        }

        const totalPayment = calculateTotalWithTax(formData);

        // Format seat selections ensuring numeric seat_id values
        const seatSelections = formData.seatSelections.map((seatId) => ({
          seat_id: Number(seatId),
          version: 0,
        }));

        const transactionData = {
          userData: {
            user_id: user.id,
          },
          passengerData: formData.passengerData,
          seatSelections,
          planeId: flightState.selectedDepartureFlight.plane_id,
          is_round_trip: flightState.isRoundTrip,
          total_payment: totalPayment,
        };

        if (flightState.isRoundTrip) {
          transactionData.returnPlaneId =
            flightState.selectedReturnFlight.plane_id;
          transactionData.returnSeatSelections =
            formData.returnSeatSelections.map((seatId) => ({
              seat_id: Number(seatId),
              version: 0,
            }));
        }

        console.log('Sending transaction data:', transactionData);

        const result = await paymentService.createTransaction(transactionData);

        if (result.isSuccess) {
          dispatch(setTransactionId(result.data.id));
          dispatch(setTransactionData(transactionData));
          dispatch(
            setPaymentData({
              amount: totalPayment,
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
        console.error('Transaction error:', error);
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
    [dispatch, user, flightState, calculateTotalWithTax, validateSeatSelections]
  );

  const initiatePayment = useCallback(
    async (paymentData) => {
      dispatch(setLoading(true));
      try {
        const flightDetails = flightState.isRoundTrip
          ? `Flight ${flightState.selectedDepartureFlight.plane_code} (Round-trip)`
          : `Flight ${flightState.selectedDepartureFlight.plane_code}`;

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
              productName: flightDetails,
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

  return {
    createTransaction,
    initiatePayment,
    loading: state.loading,
    error: state.error,
    transactionId: state.transactionId,
    paymentId: state.paymentId,
  };
};
