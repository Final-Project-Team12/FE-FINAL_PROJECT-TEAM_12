import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import paymentReducer from './slices/paymentSlice';
import flightReducer from './slices/flightSlice';
import flightSearchReducer from './slices/flightSearchSlice';
import flightFilterReducer from './slices/flightFilterSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['payment', 'flight', 'flightSearch', 'flightFilter'],
};

const persistedPaymentReducer = persistReducer(persistConfig, paymentReducer);
const persistedFlightReducer = persistReducer(persistConfig, flightReducer);
const persistedFlightSearchReducer = persistReducer(
  persistConfig,
  flightSearchReducer
);
const persistedFlightFilterReducer = persistReducer(
  persistConfig,
  flightFilterReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: persistedPaymentReducer,
    flight: persistedFlightReducer,
    flightSearch: persistedFlightSearchReducer,
    flightFilter: persistedFlightFilterReducer,
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
          'payload.sortCriteria',
          'payload.searchParams',
          'meta.arg.filters.departureDate',
          'meta.arg.filters.searchParams',
          'payload.meta.arg.filters.departureDate',
          'payload.meta.arg.filters.searchParams',
          'payload.filters.departureDate',
          'payload.data.outbound_flights',
          'payload.data.return_flights',
          'payload.selectedFlight',
          'payload.fromCityDisplay',
          'payload.toCityDisplay',
          'meta.arg.searchParams',
          'meta.arg.filters',
        ],
        ignoredPaths: [
          'flightSearch.departureDate',
          'flightSearch.returnDate',
          'flightSearch.selectedFlight',
          'flightSearch.fromCityDisplay',
          'flightSearch.toCityDisplay',
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
    }),
});

export const persistor = persistStore(store);
