import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromCity: '',
  toCity: '',
  fromCityDisplay: '',
  toCityDisplay: '',
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
  searchResults: {
    outbound_flights: [],
    return_flights: [],
  },
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
      const tempCityDisplay = state.fromCityDisplay;
      state.fromCity = state.toCity;
      state.fromCityDisplay = state.toCityDisplay;
      state.toCity = tempCity;
      state.toCityDisplay = tempCityDisplay;
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
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = {
        outbound_flights: [],
        return_flights: [],
      };
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
  setSearchResults,
  clearSearchResults,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
