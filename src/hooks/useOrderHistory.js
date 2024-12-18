import {
  setOrderHistory,
  setLoading,
  setError,
} from '../store/slices/orderHistorySlice';
import { getOrderHistory } from '../services/orderHistory.service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useOrderHistory = () => {
  const dispatch = useDispatch();
  const { orderHistory, loading, error } = useSelector(
    (state) => state.orderHistory
  );

  const fetchOrderHistory = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getOrderHistory();
      dispatch(setOrderHistory(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return { orderHistory, loading, error };
};

export default useOrderHistory;
