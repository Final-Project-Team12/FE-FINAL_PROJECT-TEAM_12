import { createContext, useContext, useReducer, useCallback } from 'react';
import { getFlights } from '../services/flight.service';

const FlightContext = createContext();
const CACHE_DURATION = 5 * 60 * 1000;

const initialState = {
  flights: [],
  loading: false,
  error: null,
  lastUpdated: null,
  cache: new Map(),
};

const flightReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FLIGHTS':
      return {
        ...state,
        flights: action.payload,
        lastUpdated: Date.now(),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_CACHE':
      const newCache = new Map(state.cache);
      newCache.set(action.payload.key, {
        data: action.payload.data,
        timestamp: Date.now(),
      });
      return { ...state, cache: newCache };
    case 'CLEAR_CACHE':
      return { ...state, cache: new Map() };
    default:
      return state;
  }
};

export const FlightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(flightReducer, initialState);

  const isCacheValid = useCallback((timestamp) => {
    return timestamp && Date.now() - timestamp < CACHE_DURATION;
  }, []);

  const fetchFlights = useCallback(
    async (page = 1, limit = 5, forceRefresh = false) => {
      const cacheKey = `flights_${page}_${limit}`;
      const cachedData = state.cache.get(cacheKey);

      if (!forceRefresh && cachedData && isCacheValid(cachedData.timestamp)) {
        dispatch({ type: 'SET_FLIGHTS', payload: cachedData.data.data });
        return cachedData.data;
      }

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const response = await getFlights(page, limit);
        if (response.isSuccess) {
          dispatch({ type: 'SET_FLIGHTS', payload: response.data });
          dispatch({
            type: 'UPDATE_CACHE',
            payload: { key: cacheKey, data: response },
          });
          return response;
        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
        }
      } catch (err) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to fetch flights data',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [isCacheValid, state.cache]
  );

  const clearCache = useCallback(() => {
    dispatch({ type: 'CLEAR_CACHE' });
  }, []);

  const refreshData = useCallback(
    (page = 1, limit = 5) => {
      return fetchFlights(page, limit, true);
    },
    [fetchFlights]
  );

  const value = {
    ...state,
    fetchFlights,
    clearCache,
    refreshData,
  };

  return (
    <FlightContext.Provider value={value}>{children}</FlightContext.Provider>
  );
};

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within a FlightProvider');
  }
  return context;
};
