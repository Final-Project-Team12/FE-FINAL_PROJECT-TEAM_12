import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import paymentReducer from './slices/paymentSlice';
import flightReducer from './slices/flightSlice';
import flightSearchReducer from './slices/flightSearchSlice';
import flightFilterReducer from './slices/flightFilterSlice';
import registerReducer from './slices/registerSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';
import orderHistoryReducer from './slices/orderHistorySlice';
import printTicketSliceReducer from './slices/printTicketSlice';

const dateSerializer = {
  serialize: (date) => (date instanceof Date ? date.toISOString() : date),
  deserialize: (dateString) => (dateString ? new Date(dateString) : null),
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    payment: paymentReducer,
    flight: flightReducer,
    flightSearch: flightSearchReducer,
    flightFilter: flightFilterReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
    orderHistory: orderHistoryReducer,
    printTicket: printTicketSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'auth/loginSuccess',
          'auth/loginFailure',
          'auth/logout',

          'user/fetchById/pending',
          'user/fetchById/fulfilled',
          'user/fetchById/rejected',
          'user/updateProfile/pending',
          'user/updateProfile/fulfilled',
          'user/updateProfile/rejected',
          'user/deleteAccount/pending',
          'user/deleteAccount/fulfilled',
          'user/deleteAccount/rejected',
          'user/resetUserData',
          'user/clearUserErrors',

          'flightFilter/setSortCriteria',
          'flightFilter/setActiveFilters',
          'flightFilter/setSearchParams',
          'flightFilter/fetchFilteredFlights/fulfilled',
          'flightFilter/fetchFilteredFlights/pending',
          'flightFilter/fetchFilteredFlights/rejected',
          'flightFilter/clearAllFilters',
          'flightFilter/goToNextPage',

          'flightSearch/updateFlightSearch',
          'flightSearch/resetFlightSearch',
          'flightSearch/clearSelectedFlights',
          'flightSearch/swapCities',
          'flightSearch/updatePassengerCount',
          'flightSearch/setSeatPrices',
          'flightSearch/updateSelectedSeatClass',
          'flightSearch/setSearchResults',
          'flightSearch/clearSearchResults',

          'register/registerStart',
          'register/registerSuccess',
          'register/registerFailure',
          'register/otpStart',
          'register/otpSuccess',
          'register/otpFailure',
          'register/resetRegisterState',

          'resetPassword/resetPasswordStart',
          'resetPassword/resetPasswordSuccess',
          'resetPassword/resetPasswordFailure',
          'resetPassword/resetOtpStart',
          'resetPassword/resetOtpSuccess',
          'resetPassword/resetOtpFailure',
          'resetPassword/resetState',
        ],
        ignoredActionPaths: [
          'payload.user',
          'payload.decodedToken',
          'meta.arg.credentials',

          'payload.userData',
          'meta.arg.userData',
          'payload.password',
          'meta.arg.password',

          'payload.departureDate',
          'payload.returnDate',
          'meta.arg.departureDate',
          'meta.arg.returnDate',
          'payload.selectedDepartureFlight',
          'payload.selectedReturnFlight',
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
          'payload.departureDateDisplay',
          'payload.returnDateDisplay',

          'payload.registerData',
          'meta.arg.registerData',
          'payload.otpCode',
          'meta.arg.otpCode',

          'payload.resetPasswordData',
          'meta.arg.resetPasswordData',
          'payload.resetOtpCode',
          'meta.arg.resetOtpCode',
        ],
        ignoredPaths: [
          'auth.user',
          'auth.loading',
          'auth.error',

          'user.userData',
          'user.loading',
          'user.error',
          'user.updateLoading',
          'user.updateError',
          'user.deleteLoading',
          'user.deleteError',

          'flightSearch.departureDate',
          'flightSearch.returnDate',
          'flightSearch.departureDateDisplay',
          'flightSearch.returnDateDisplay',
          'flightSearch.selectedDepartureFlight',
          'flightSearch.selectedReturnFlight',
          'flightSearch.fromCityDisplay',
          'flightSearch.toCityDisplay',
          'flightSearch.searchResults',
          'flightSearch.seatPrices',

          'flightFilter.departureDate',
          'flightFilter.returnDate',
          'flightFilter.sortCriteria',
          'flightFilter.activeFilters',
          'flightFilter.activeFilters.departureDate',
          'flightFilter.filteredFlights',
          'flightFilter.filteredFlights.outbound_flights',
          'flightFilter.filteredFlights.return_flights',
          'flightFilter.searchParams',
          'flightFilter.searchParams.departureDate',
          'flightFilter.searchParams.returnDate',

          'payment.orderData',
          'payment.paymentDetails',
          'flight.selectedFlight',
          'flight.searchResults',

          'register.loading',
          'register.error',
          'register.isRegistered',
          'register.isOtpVerified',

          'resetPassword.loading',
          'resetPassword.error',
          'resetPassword.isOtpSent',
          'resetPassword.isOtpVerified',
          'resetPassword.isPasswordReset',
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

export const serializeDate = (date) => {
  return date instanceof Date ? date.toISOString() : date;
};

export const deserializeDate = (dateString) => {
  return dateString ? new Date(dateString) : null;
};

export const resetStore = () => {
  store.dispatch({ type: 'auth/logout' });
  store.dispatch({ type: 'user/resetUserData' });
  store.dispatch({ type: 'flightSearch/resetFlightSearch' });
  store.dispatch({ type: 'flightFilter/clearAllFilters' });
  store.dispatch({ type: 'payment/resetPaymentState' });
  store.dispatch({ type: 'register/resetRegisterState' });
  store.dispatch({ type: 'resetPassword/resetState' });
};

export default store;
