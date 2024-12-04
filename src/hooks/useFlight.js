import { useState, useEffect } from 'react';
import { getFlights } from '../services/flight.service';

export const useFlights = (initialPage = 1, initialLimit = 20) => {
  const [flights, setFlights] = useState({
    outbound_flights: [],
    return_flights: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchFlights = async (page = initialPage, limit = initialLimit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFlights(page, limit);
      if (response.isSuccess) {
        setFlights(response.data);
        setPagination(response.pagination);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch flights data');
    } finally {
      setLoading(false);
    }
  };

  return {
    flights,
    loading,
    error,
    pagination,
    fetchFlights,
  };
};
