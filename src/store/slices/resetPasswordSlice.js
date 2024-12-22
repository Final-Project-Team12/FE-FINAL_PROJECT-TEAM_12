import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isOtpSent: false,
  isOtpVerified: false,
  isPasswordReset: false,
  error: null,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.isPasswordReset = true;
      state.error = null;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetOtpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetOtpSuccess: (state) => {
      state.loading = false;
      state.isOtpVerified = true;
      state.error = null;
    },
    resetOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetOtpStart,
  resetOtpSuccess,
  resetOtpFailure,
  resetState,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
