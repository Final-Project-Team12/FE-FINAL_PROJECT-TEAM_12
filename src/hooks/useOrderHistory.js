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
            const outbound = {
              ...transaction.outbound,
              trip_type: 'outbound',
              related_transaction: transaction.return,
            };
            const return_flight = {
              ...transaction.return,
              trip_type: 'return',
              related_transaction: transaction.outbound,
            };
            return [outbound, return_flight];
          } else {
            return [
              {
                ...transaction.transaction,
                trip_type: 'single',
                related_transaction: null,
              },
            ];
          }
        });

        const flattenedData = transformedData.flat();

        dispatch(setOrderHistory(flattenedData));
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
