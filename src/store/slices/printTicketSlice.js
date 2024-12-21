import { createSlice } from '@reduxjs/toolkit';
import registerSlice from './registerSlice';
import { printTicket } from '../../services/printTicket.service';

const initialState = {
  loading: false,
  printTicket: false,
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
    printTicketSuccess: (state) => {
      state.loading = false;
      state.printTicket = true;
      state.error = null;
    },
    printTicketFailure: (state) => {
      state.loading = false;
      state.printTicket = false;
      state.error = action.payload || { message: 'Print ticket failed' };
    },
  },
});

export const { printTicketStart, printTicketSuccess, printTicketFailure } =
  printTicketSlice.actions;

export default printTicketSlice.reducer;
