import { useState, useEffect, useCallback, useRef } from 'react';
import { flightManagementAndBookingService } from '../services/flight.service';

export const useFlightSearchAndFilterManagement = (initialFilters = {}) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    priceSort: '',
    departureSort: '',
    arrivalSort: '',
    durationSort: '',
    minPrice: '',
    maxPrice: '',
    facilities: [],
    ...initialFilters,
  });

  // This ref prevents making duplicate requests
  const isRequestInProgress = useRef(false);

  const observer = useRef();
  const lastFlightElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !isRequestInProgress.current
          ) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          root: null,
          rootMargin: '20px',
          threshold: 0.1,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  const fetchFlights = useCallback(async () => {
    if (isRequestInProgress.current) return;

    try {
      isRequestInProgress.current = true;
      setLoading(true);
      setError(null);

      const response =
        await flightManagementAndBookingService.fetchAvailableFlightsWithFiltersAndPagination(
          {
            page,
            limit: 3, // Load 3 items per page
            ...filters,
          }
        );

      setFlights((prevFlights) => {
        if (page === 1) {
          return response.data.outbound_flights;
        }
        // Remove duplicates when adding new flights
        const newFlights = response.data.outbound_flights;
        const existingIds = new Set(prevFlights.map((f) => f.plane_id));
        const uniqueNewFlights = newFlights.filter(
          (f) => !existingIds.has(f.plane_id)
        );
        return [...prevFlights, ...uniqueNewFlights];
      });

      setHasMore(response.pagination.hasNextPage);
    } catch (err) {
      setError('Failed to fetch flights. Please try again later.');
    } finally {
      setLoading(false);
      isRequestInProgress.current = false;
    }
  }, [page, filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
    setFlights([]); // Clear existing flights when filters change
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceSort: '',
      departureSort: '',
      arrivalSort: '',
      durationSort: '',
      minPrice: '',
      maxPrice: '',
      facilities: [],
    });
    setPage(1);
    setFlights([]); // Clear existing flights when resetting filters
  }, []);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  return {
    flights,
    loading,
    error,
    hasMore,
    filters,
    lastFlightElementRef,
    updateFilters,
    resetFilters,
  };
};
