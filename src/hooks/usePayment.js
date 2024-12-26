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
        const totalBasePrice =
          departureSeatPrice + (flightState.isRoundTrip ? returnSeatPrice : 0);
        const totalPassengerPrice =
          totalBasePrice * formData.passengerData.length;
        const tax = Math.round(totalPassengerPrice * 0.1);
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

  const validateSeatSelections = useCallback((seats, passengerCount) => {
    if (!Array.isArray(seats)) {
      console.error('Seats is not an array:', seats);
      return false;
    }

    if (seats.length !== passengerCount) {
      console.error('Wrong number of seats:', {
        seatsLength: seats.length,
        passengerCount,
      });
      return false;
    }

    return seats.every((seatId) => {
      const numericSeatId = Number(seatId);
      const isValid = !isNaN(numericSeatId) && numericSeatId > 0;
      if (!isValid) {
        console.error('Invalid seat ID:', seatId);
      }
      return isValid;
    });
  }, []);

  const createTransaction = useCallback(
    async (formData) => {
      dispatch(setLoading(true));
      try {
        const passengerCount = formData.passengerData.length;
        const departureSeatSelections = formData.seatSelections;
        let returnSeatSelections = [];

        if (
          !validateSeatSelections(
            departureSeatSelections.map((s) => s.seat_id),
            passengerCount
          )
        ) {
          throw new Error('Invalid departure seat selections');
        }

        if (flightState.isRoundTrip) {
          returnSeatSelections = formData.returnSeatSelections;
          if (
            !validateSeatSelections(
              returnSeatSelections.map((s) => s.seat_id),
              passengerCount
            )
          ) {
            throw new Error('Invalid return seat selections');
          }
        }

        const transactionData = {
          userData: {
            user_id: user.id,
          },
          passengerData: formData.passengerData.map((passenger) => ({
            title: passenger.title,
            full_name: passenger.fullName.trim(),
            family_name:
              passenger.hasFamily && passenger.familyName
                ? passenger.familyName.trim()
                : undefined,
            birth_date: passenger.birthDate,
            nationality: passenger.nationality,
            id_number: passenger.idNumber.trim(),
            id_issuer: passenger.issuingCountry,
            id_expiry: passenger.expiryDate,
          })),
          seatSelections: departureSeatSelections,
          planeId: flightState.selectedDepartureFlight.plane_id,
          isRoundTrip: flightState.isRoundTrip,
        };

        if (flightState.isRoundTrip) {
          transactionData.returnPlaneId =
            flightState.selectedReturnFlight.plane_id;
          transactionData.returnSeatSelections = returnSeatSelections;
        }

        console.log('Sending transaction data:', transactionData);

        const result = await paymentService.createTransaction(transactionData);

        if (result.isSuccess) {
          if (result.data.type === 'round') {
            dispatch(setTransactionId(result.data.outbound.transaction_id));
            dispatch(
              setTransactionData({
                outbound: result.data.outbound,
                return: result.data.return,
              })
            );
            dispatch(
              setPaymentData({
                amount: result.data.total_payment,
                orderId: result.data.outbound.transaction_id,
              })
            );
          } else if (result.data.data) {
            dispatch(setTransactionId(result.data.data.transaction_id));
            dispatch(setTransactionData(result.data.data));
            dispatch(
              setPaymentData({
                amount: result.data.data.total_payment,
                orderId: result.data.data.transaction_id,
              })
            );
          } else {
            throw new Error('Invalid response format');
          }

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
    [dispatch, user, flightState, validateSeatSelections, calculateTotalWithTax]
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
