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
          'flightFilter/fetchFilteredFlights/fulfilled',
          'flightFilter/fetchFilteredFlights/pending',
          'flightFilter/fetchFilteredFlights/rejected',
        ],
        ignoredActionPaths: [
          'payload.departureDate',
          'payload.returnDate',
          'payload.sortCriteria',
          'meta.arg.filters.departureDate',
          'payload.meta.arg.filters.departureDate',
          'payload.filters.departureDate',
          'payload.data.outbound_flights',
          'payload.data.return_flights',
        ],
        ignoredPaths: [
          'flightSearch.departureDate',
          'flightSearch.returnDate',
          'flightFilter.departureDate',
          'flightFilter.returnDate',
          'flightFilter.sortCriteria',
          'flightFilter.activeFilters.departureDate',
          'flightFilter.filteredFlights',
        ],
      },
    }),
});

export const persistor = persistStore(store);
