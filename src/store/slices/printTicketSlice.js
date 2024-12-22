import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  printTicket: null,
  error: null,
};

const printTicketSlice = createSlice({
  name: 'printTicket',
  initialState,
  reducers: {
    printTicketStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    printTicketSuccess: (state, action) => {
      state.loading = false;
      state.printTicket = action.payload;
      state.error = null;
    },
    printTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { printTicketStart, printTicketSuccess, printTicketFailure } =
  printTicketSlice.actions;

export default printTicketSlice.reducer;
