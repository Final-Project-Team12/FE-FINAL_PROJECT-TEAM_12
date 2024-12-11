import { useState, useCallback, useRef } from 'react';
import { getFlights } from '../services/flight.service';

export const useFlights = (initialPage = 1, initialLimit = 5) => {
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cache = useRef(new Map());

  const fetchFlights = useCallback(
    async (page = initialPage, limit = initialLimit) => {
      const cacheKey = `${page}-${limit}`;

      if (cache.current.has(cacheKey)) {
        setFlights(cache.current.get(cacheKey).data);
        return cache.current.get(cacheKey);
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getFlights(page, limit);
        if (response.isSuccess) {
          setFlights(response.data);

          cache.current.set(cacheKey, response);
          return response;
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch flights data');
      } finally {
        setLoading(false);
      }
    },
    [initialPage, initialLimit]
  );

  const clearCache = useCallback(() => {
    cache.current.clear();

    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('flights_')) {
        sessionStorage.removeItem(key);
      }
    });
  }, []);

  return {
    flights,
    loading,
    error,
    fetchFlights,
    clearCache,
  };
};
