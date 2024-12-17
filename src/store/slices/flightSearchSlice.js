import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromCity: '',
  toCity: '',
  fromCityDisplay: '',
  toCityDisplay: '',
  departureDate: new Date(),
  returnDate: new Date(),
  departureDateDisplay: '',
  returnDateDisplay: '',
  isRoundTrip: false,
  passengerCounts: {
    adult: 1,
    child: 0,
    infant: 0,
  },
  selectedSeatClass: 'Economy',
  selectedDepartureFlight: null,
  selectedReturnFlight: null,
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
  lastSearchParams: null,
};

export const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    updateFlightSearch: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFlightSearch: () => initialState,
    clearSelectedFlights: (state) => {
      state.selectedDepartureFlight = null;
      state.selectedReturnFlight = null;
      state.departureDateDisplay = '';
      state.returnDateDisplay = '';
    },
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
    setLastSearchParams: (state, action) => {
      state.lastSearchParams = action.payload;
    },
    clearLastSearchParams: (state) => {
      state.lastSearchParams = null;
    },
  },
});

export const {
  updateFlightSearch,
  resetFlightSearch,
  clearSelectedFlights,
  swapCities,
  updatePassengerCount,
  setSeatPrices,
  updateSelectedSeatClass,
  setSearchResults,
  clearSearchResults,
  setLastSearchParams,
  clearLastSearchParams,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
