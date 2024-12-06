import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromCity: '',
  toCity: '',
  departureDate: new Date(),
  returnDate: new Date(),
  isRoundTrip: false,
  passengerCounts: {
    adult: 1,
    child: 0,
    infant: 0,
  },
  selectedSeatClass: 'Economy',
  selectedFlight: null,
  seatPrices: {
    Economy: 0,
    'Premium Economy': 0,
    Business: 0,
    'First Class': 0,
  },
};

export const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    updateFlightSearch: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetFlightSearch: () => initialState,
    swapCities: (state) => {
      const tempCity = state.fromCity;
      state.fromCity = state.toCity;
      state.toCity = tempCity;
    },
    updatePassengerCount: (state, action) => {
      state.passengerCounts = {
        ...state.passengerCounts,
        ...action.payload,
      };
    },
    setSeatPrices: (state, action) => {
      state.seatPrices = action.payload;
    },
    updateSelectedSeatClass: (state, action) => {
      state.selectedSeatClass = action.payload;
    },
  },
});

export const {
  updateFlightSearch,
  resetFlightSearch,
  swapCities,
  updatePassengerCount,
  setSeatPrices,
  updateSelectedSeatClass,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
