import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderData: {
    orderName: '',
    orderFamily: '',
    phone: '',
    email: '',
    passenger: {
      hasFamily: false,
      title: 'Mr.',
      fullName: '',
      familyName: '',
      birthDate: '',
      nationality: '',
      idNumber: '',
      issuingCountry: '',
      expiryDate: '',
    },
  },
  selectedSeats: [],
  hasFamily: false,
  isSubmitted: false,
  timeLeft: 900,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateOrderData: (state, action) => {
      state.orderData = {
        ...state.orderData,
        ...action.payload,
      };
    },
    updatePassengerData: (state, action) => {
      state.orderData.passenger = {
        ...state.orderData.passenger,
        ...action.payload,
      };
    },
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
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
  },
});

export const {
  updateOrderData,
  updatePassengerData,
  setSelectedSeats,
  setHasFamily,
  setIsSubmitted,
  updateTimeLeft,
  resetPaymentState,
} = paymentSlice.actions;

export default paymentSlice.reducer;
