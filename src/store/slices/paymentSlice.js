import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionData: {
    outbound: null,
    return: null,
  },
  paymentData: {
    orderId: '',
    amount: 0,
    customerDetails: {
      name: '',
      email: '',
      mobile_number: '',
      address: '',
    },
    productDetails: [],
  },
  transactionId: null,
  paymentId: null,
  orderData: {
    orderName: '',
    email: '',
    phone: '',
    address: '',
    passengers: [],
  },
  selectedDepartureSeats: [],
  selectedReturnSeats: [],
  hasFamily: false,
  isSubmitted: false,
  timeLeft: 900,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setTransactionData: (state, action) => {
      if (action.payload.outbound && action.payload.return) {
        // Handle round-trip transaction
        state.transactionData = {
          outbound: action.payload.outbound,
          return: action.payload.return,
        };
      } else {
        // Handle single trip transaction
        state.transactionData = {
          outbound: action.payload,
          return: null,
        };
      }
    },
    setPaymentData: (state, action) => {
      state.paymentData = {
        ...state.paymentData,
        ...action.payload,
      };
    },
    setTransactionId: (state, action) => {
      state.transactionId = action.payload;
    },
    setPaymentId: (state, action) => {
      state.paymentId = action.payload;
    },
    updateOrderData: (state, action) => {
      state.orderData = {
        ...state.orderData,
        ...action.payload,
      };
    },
    updatePassengerData: (state, action) => {
      if (state.orderData.passengers) {
        const index = action.payload.index;
        const passengerData = action.payload.data;
        state.orderData.passengers = state.orderData.passengers.map(
          (passenger, i) =>
            i === index ? { ...passenger, ...passengerData } : passenger
        );
      }
    },
    setSelectedDepartureSeats: (state, action) => {
      state.selectedDepartureSeats = action.payload;
    },
    setSelectedReturnSeats: (state, action) => {
      state.selectedReturnSeats = action.payload;
    },
    setHasFamily: (state, action) => {
      state.hasFamily = action.payload;
    },
    setIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    updateTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    resetPaymentState: () => initialState,
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPassenger: (state, action) => {
      if (!state.orderData.passengers) {
        state.orderData.passengers = [];
      }
      state.orderData.passengers.push(action.payload);
    },
    removePassenger: (state, action) => {
      const index = action.payload;
      if (
        state.orderData.passengers &&
        state.orderData.passengers.length > index
      ) {
        state.orderData.passengers = state.orderData.passengers.filter(
          (_, i) => i !== index
        );
      }
    },
    updateAllPassengers: (state, action) => {
      state.orderData.passengers = action.payload;
    },
  },
});

export const {
  setTransactionData,
  setPaymentData,
  setTransactionId,
  setPaymentId,
  updateOrderData,
  updatePassengerData,
  setSelectedDepartureSeats,
  setSelectedReturnSeats,
  setHasFamily,
  setIsSubmitted,
  updateTimeLeft,
  resetPaymentState,
  setLoading,
  setError,
  addPassenger,
  removePassenger,
  updateAllPassengers,
} = paymentSlice.actions;

export default paymentSlice.reducer;
