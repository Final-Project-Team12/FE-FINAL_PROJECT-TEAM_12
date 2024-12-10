import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isRegister: false,
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
      state.isRegister = false;
    },
    registerSuccess: (state) => {
      state.loading = true;
      state.error = null;
      state.isRegister = true;
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
      state.error = null;
      state.isOtpVerified = true;
    },
    otpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
} = registerSlice.actions;
export default registerSlice.reducer;
