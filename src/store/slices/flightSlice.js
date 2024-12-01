import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flightDetails: null,
  loading: false,
  error: null,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightDetails: (state, action) => {
      state.flightDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setFlightDetails, setLoading, setError } = flightSlice.actions;

export default flightSlice.reducer;
