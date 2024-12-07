import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { flightManagementAndBookingService } from '../../services/flight.service';

export const fetchFilteredFlights = createAsyncThunk(
  'flightFilter/fetchFilteredFlights',
  async ({ page = 1, filters = {} }, { rejectWithValue }) => {
    try {
      const response =
        await flightManagementAndBookingService.fetchAvailableFlightsWithFiltersAndPagination(
          {
            page,
            limit: 3,
            ...filters,
          }
        );

      let filteredFlights = response.data.outbound_flights;

      if (filters.facilities?.length > 0) {
        filteredFlights = filteredFlights.filter((flight) => {
          return filters.facilities.every((facility) => {
            switch (facility) {
              case 'wifi':
                return flight.wifi_available;
              case 'meals':
                return flight.meal_available;
              case 'entertainment':
                return flight.in_flight_entertainment;
              case 'power':
                return flight.power_outlets;
              default:
                return true;
            }
          });
        });
      }

      return {
        ...response,
        data: {
          ...response.data,
          outbound_flights: filteredFlights,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch flights');
    }
  }
);

const initialState = {
  filteredFlights: [],
  isLoading: false,
  error: null,
  hasMoreFlights: true,
  currentPageNumber: 1,
  activeFilters: {
    minPrice: '',
    maxPrice: '',
    facilities: [],
  },
};

const flightFilterSlice = createSlice({
  name: 'flightFilter',
  initialState,
  reducers: {
    setActiveFilters: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
      state.filteredFlights = [];
      state.currentPageNumber = 1;
      state.hasMoreFlights = true;
    },
    clearAllFilters: (state) => {
      state.activeFilters = initialState.activeFilters;
      state.filteredFlights = [];
      state.currentPageNumber = 1;
      state.hasMoreFlights = true;
    },
    goToNextPage: (state) => {
      state.currentPageNumber += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredFlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredFlights.fulfilled, (state, action) => {
        const newFlights = action.payload.data.outbound_flights;
        if (state.currentPageNumber === 1) {
          state.filteredFlights = newFlights;
        } else {
          const existingIds = new Set(
            state.filteredFlights.map((f) => f.plane_id)
          );
          const uniqueNewFlights = newFlights.filter(
            (f) => !existingIds.has(f.plane_id)
          );
          state.filteredFlights = [
            ...state.filteredFlights,
            ...uniqueNewFlights,
          ];
        }
        state.hasMoreFlights = action.payload.pagination.hasNextPage;
        state.isLoading = false;
      })
      .addCase(fetchFilteredFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch flights';
      });
  },
});

export const { setActiveFilters, clearAllFilters, goToNextPage } =
  flightFilterSlice.actions;
export default flightFilterSlice.reducer;
