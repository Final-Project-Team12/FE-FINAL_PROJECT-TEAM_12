import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Dummy data
const availableCities = [
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Medan',
  'Bali',
  'Makassar',
  'Palembang',
  'Semarang',
  'Malang',
];

export const searchCities = createAsyncThunk(
  'citySelection/searchCities',
  async (query) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return availableCities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export const getAllCities = createAsyncThunk(
  'citySelection/getAllCities',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return availableCities;
  }
);

const initialState = {
  searchQuery: '',
  searchResults: [],
  recentCities: [],
  allCities: [],
  isLoading: false,
  error: null,
  selectedFromCity: '',
  selectedToCity: '',
};

const citySelectionSlice = createSlice({
  name: 'citySelection',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addToRecentCities: (state, action) => {
      const city = action.payload;
      if (!state.recentCities.includes(city)) {
        state.recentCities = [city, ...state.recentCities.slice(0, 4)];
      }
    },
    removeFromRecentCities: (state, action) => {
      state.recentCities = state.recentCities.filter(
        (city) => city !== action.payload
      );
    },
    clearRecentCities: (state) => {
      state.recentCities = [];
    },
    setSelectedFromCity: (state, action) => {
      state.selectedFromCity = action.payload;
    },
    setSelectedToCity: (state, action) => {
      state.selectedToCity = action.payload;
    },
    swapCities: (state) => {
      const temp = state.selectedFromCity;
      state.selectedFromCity = state.selectedToCity;
      state.selectedToCity = temp;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle searchCities
      .addCase(searchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.searchResults = [];
      })
      // Handle getAllCities
      .addCase(getAllCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCities = action.payload;
      })
      .addCase(getAllCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.allCities = [];
      });
  },
});

export const {
  setSearchQuery,
  addToRecentCities,
  removeFromRecentCities,
  clearRecentCities,
  setSelectedFromCity,
  setSelectedToCity,
  swapCities,
  clearSearchResults,
} = citySelectionSlice.actions;

export const selectCitySelection = (state) => state.citySelection;
export const selectSearchResults = (state) => state.citySelection.searchResults;
export const selectRecentCities = (state) => state.citySelection.recentCities;
export const selectSelectedCities = (state) => ({
  fromCity: state.citySelection.selectedFromCity,
  toCity: state.citySelection.selectedToCity,
});
export const selectIsLoading = (state) => state.citySelection.isLoading;
export const selectError = (state) => state.citySelection.error;

export default citySelectionSlice.reducer;
