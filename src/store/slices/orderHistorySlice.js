import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderHistory: null,
  loading: false,
  error: null,
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    setOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
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

export const { setOrderHistory, setLoading, setError } =
  orderHistorySlice.actions;

export default orderHistorySlice.reducer;
