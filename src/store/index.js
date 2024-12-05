import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
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
    auth: authReducer,
    payment: persistedPaymentReducer,
    flight: persistedFlightReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);
