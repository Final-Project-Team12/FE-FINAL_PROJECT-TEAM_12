import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isRegistered: false,
  isOtpVerified: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.isRegistered = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    otpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpSuccess: (state) => {
      state.loading = false;
      state.isOtpVerified = true;
      state.error = null;
    },
    otpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetRegisterState: (state) => {
      return initialState;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  otpStart,
  otpSuccess,
  otpFailure,
  resetRegisterState,
} = registerSlice.actions;

export default registerSlice.reducer;
