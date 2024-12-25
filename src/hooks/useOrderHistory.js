import {
  setOrderHistory,
  setLoading,
  setError,
} from '../store/slices/orderHistorySlice';
import orderHistoryService from '../services/orderHistory.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

const useOrderHistory = () => {
  const dispatch = useDispatch();
  const { orderHistory, loading, error } = useSelector(
    (state) => state.orderHistory
  );
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrderHistory = async (id) => {
      if (!id) return;
      dispatch(setLoading(true));
      try {
        const response = await orderHistoryService.getOrderHistory(id);

        const transformedData = response.map((transaction) => {
          if (transaction.type === 'round') {
            const roundTripTotal =
              transaction.outbound.total_payment +
              transaction.return.total_payment;
            return {
              ...transaction.outbound,
              trip_type: 'round',
              return_flight: transaction.return,
              total_round_payment: roundTripTotal,
            };
          } else {
            return {
              ...transaction.transaction,
              trip_type: 'single',
            };
          }
        });

        dispatch(setOrderHistory(transformedData));
      } catch (error) {
        dispatch(setError(error.message || 'Failed to fetch order history'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (user?.id) {
      fetchOrderHistory(user.id);
    }
  }, [dispatch, user]);

  return { orderHistory, loading, error };
};

export default useOrderHistory;
