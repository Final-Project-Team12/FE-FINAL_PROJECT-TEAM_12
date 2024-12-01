import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setFlightDetails,
  setLoading,
  setError,
} from '../store/slices/flightSlice';
import { getFlightDetails } from '../services/flight.service';

export const useFlightDetails = (flightId) => {
  const dispatch = useDispatch();
  const { flightDetails, loading, error } = useSelector(
    (state) => state.flight
  );

  const fetchFlightDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getFlightDetails(flightId);
      if (response.isSuccess) {
        dispatch(setFlightDetails(response.data));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    fetchFlightDetails();
  }, [flightId]);

  return { flightDetails, loading, error };
};
