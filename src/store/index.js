import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import paymentReducer from './slices/paymentSlice';
import flightReducer from './slices/flightSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['payment', 'flight'],
};

const persistedPaymentReducer = persistReducer(persistConfig, paymentReducer);
const persistedFlightReducer = persistReducer(persistConfig, flightReducer);

export const store = configureStore({
  reducer: {
    payment: persistedPaymentReducer,
    flight: persistedFlightReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
