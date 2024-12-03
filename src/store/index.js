import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import paymentReducer from './slices/paymentSlice';
import flightReducer from './slices/flightSlice';
import citySelectionReducer from './slices/citySelectionSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['payment', 'flight', 'citySelection'],
};

const persistedPaymentReducer = persistReducer(persistConfig, paymentReducer);
const persistedFlightReducer = persistReducer(persistConfig, flightReducer);
const persistedCitySelectionReducer = persistReducer(
  persistConfig,
  citySelectionReducer
);

export const store = configureStore({
  reducer: {
    payment: persistedPaymentReducer,
    flight: persistedFlightReducer,
    citySelection: persistedCitySelectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
