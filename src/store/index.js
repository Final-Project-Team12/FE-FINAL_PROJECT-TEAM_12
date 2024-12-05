// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import paymentReducer from './slices/paymentSlice';
import flightReducer from './slices/flightSlice';
import flightSearchReducer from './slices/flightSearchSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['payment', 'flight', 'flightSearch'],
};

const persistedPaymentReducer = persistReducer(persistConfig, paymentReducer);
const persistedFlightReducer = persistReducer(persistConfig, flightReducer);
const persistedFlightSearchReducer = persistReducer(
  persistConfig,
  flightSearchReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: persistedPaymentReducer,
    flight: persistedFlightReducer,
    flightSearch: persistedFlightSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
        // Mengabaikan date objects dalam state
        ignoredActionPaths: ['payload.departureDate', 'payload.returnDate'],
        ignoredPaths: ['flightSearch.departureDate', 'flightSearch.returnDate'],
      },
    }),
});

export const persistor = persistStore(store);
