import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import paymentReducer from './slices/paymentSlice';
import flightReducer from './slices/flightSlice';
import flightSearchReducer from './slices/flightSearchSlice';
import flightFilterReducer from './slices/flightFilterSlice';
import registerReducer from './slices/registerSlice';

const flightSearchPersistConfig = {
  key: 'flightSearch',
  storage,
  whitelist: [
    'fromCity',
    'toCity',
    'isRoundTrip',
    'passengerCounts',
    'selectedSeatClass',
    'seatPrices',
  ],
  blacklist: [
    'departureDate',
    'returnDate',
    'selectedFlight',
    'fromCityDisplay',
    'toCityDisplay',
    'searchResults',
  ],
};

const flightFilterPersistConfig = {
  key: 'flightFilter',
  storage,
  whitelist: ['activeFilters', 'sortCriteria'],
  blacklist: [
    'filteredFlights',
    'isLoading',
    'error',
    'hasMoreFlights',
    'currentPageNumber',
    'searchParams',
  ],
};

const paymentPersistConfig = {
  key: 'payment',
  storage,
  whitelist: ['paymentMethods'],
  blacklist: ['orderData', 'paymentDetails', 'loading', 'error'],
};

const flightPersistConfig = {
  key: 'flight',
  storage,
  blacklist: ['selectedFlight', 'searchResults', 'loading', 'error'],
};

const persistedPaymentReducer = persistReducer(
  paymentPersistConfig,
  paymentReducer
);
const persistedFlightReducer = persistReducer(
  flightPersistConfig,
  flightReducer
);
const persistedFlightSearchReducer = persistReducer(
  flightSearchPersistConfig,
  flightSearchReducer
);
const persistedFlightFilterReducer = persistReducer(
  flightFilterPersistConfig,
  flightFilterReducer
);

const dateSerializer = {
  serialize: (date) => (date instanceof Date ? date.toISOString() : date),
  deserialize: (dateString) => (dateString ? new Date(dateString) : null),
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: persistedPaymentReducer,
    flight: persistedFlightReducer,
    flightSearch: persistedFlightSearchReducer,
    flightFilter: persistedFlightFilterReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',

          'flightFilter/setSortCriteria',
          'flightFilter/setActiveFilters',
          'flightFilter/setSearchParams',
          'flightFilter/fetchFilteredFlights/fulfilled',
          'flightFilter/fetchFilteredFlights/pending',
          'flightFilter/fetchFilteredFlights/rejected',

          'flightSearch/updateFlightSearch',
          'flightSearch/resetFlightSearch',
          'flightSearch/swapCities',
          'flightSearch/updatePassengerCount',
          'flightSearch/setSeatPrices',
          'flightSearch/updateSelectedSeatClass',
          'flightSearch/setSearchResults',
          'flightSearch/clearSearchResults',
        ],
        ignoredActionPaths: [
          'payload.departureDate',
          'payload.returnDate',
          'meta.arg.departureDate',
          'meta.arg.returnDate',

          'payload.sortCriteria',
          'payload.searchParams',
          'meta.arg.filters',
          'meta.arg.searchParams',
          'payload.filters',

          'payload.data.outbound_flights',
          'payload.data.return_flights',
          'payload.selectedFlight',

          'payload.fromCityDisplay',
          'payload.toCityDisplay',
        ],
        ignoredPaths: [
          'flightSearch.departureDate',
          'flightSearch.returnDate',
          'flightSearch.selectedFlight',
          'flightSearch.fromCityDisplay',
          'flightSearch.toCityDisplay',
          'flightSearch.searchResults',

          'flightFilter.departureDate',
          'flightFilter.returnDate',
          'flightFilter.sortCriteria',
          'flightFilter.activeFilters.departureDate',
          'flightFilter.filteredFlights',
          'flightFilter.searchParams',
          'flightFilter.searchParams.departureDate',
          'flightFilter.searchParams.returnDate',

          'payment.orderData',
          'payment.paymentDetails',
          'flight.selectedFlight',
          'flight.searchResults',
        ],
      },
      serializeOptions: {
        serializer: {
          date: dateSerializer.serialize,
        },
        deserializer: {
          date: dateSerializer.deserialize,
        },
      },
    }),
});

export const persistor = persistStore(store);

export const purgeStore = () => {
  persistor.purge();
};

export const serializeDate = (date) => {
  return date instanceof Date ? date.toISOString() : date;
};

export const deserializeDate = (dateString) => {
  return dateString ? new Date(dateString) : null;
};
