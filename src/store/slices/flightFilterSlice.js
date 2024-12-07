import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { flightManagementAndBookingService } from '../../services/flight.service';

const formatDateForComparison = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

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

      if (filters.departureDate) {
        const selectedDateStr = formatDateForComparison(filters.departureDate);

        filteredFlights = filteredFlights.filter((flight) => {
          const flightDateStr = formatDateForComparison(flight.departure_time);
          return flightDateStr === selectedDateStr;
        });
      }

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

      console.log('Selected Date:', filters.departureDate);
      console.log('Filtered Flights:', filteredFlights);

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
    departureDate: null,
  },
  sortCriteria: 'price_asc',
};

const sortFlights = (flights, criteria) => {
  return [...flights].sort((a, b) => {
    switch (criteria) {
      case 'price_asc':
        return a.seats_detail[0].price - b.seats_detail[0].price;
      case 'price_desc':
        return b.seats_detail[0].price - a.seats_detail[0].price;
      case 'duration_asc':
        return a.duration - b.duration;
      case 'duration_desc':
        return b.duration - a.duration;
      case 'departure_asc':
        return new Date(a.departure_time) - new Date(b.departure_time);
      case 'departure_desc':
        return new Date(b.departure_time) - new Date(a.departure_time);
      case 'arrival_asc':
        return new Date(a.arrival_time) - new Date(b.arrival_time);
      case 'arrival_desc':
        return new Date(b.arrival_time) - new Date(a.arrival_time);
      default:
        return 0;
    }
  });
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
      state.sortCriteria = initialState.sortCriteria;
    },
    goToNextPage: (state) => {
      state.currentPageNumber += 1;
    },
    setSortCriteria: (state, action) => {
      state.sortCriteria = action.payload;
      state.filteredFlights = sortFlights(
        state.filteredFlights,
        action.payload
      );
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
          state.filteredFlights = sortFlights(newFlights, state.sortCriteria);
        } else {
          const existingIds = new Set(
            state.filteredFlights.map((f) => f.plane_id)
          );
          const uniqueNewFlights = newFlights.filter(
            (f) => !existingIds.has(f.plane_id)
          );
          state.filteredFlights = sortFlights(
            [...state.filteredFlights, ...uniqueNewFlights],
            state.sortCriteria
          );
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

export const {
  setActiveFilters,
  clearAllFilters,
  goToNextPage,
  setSortCriteria,
} = flightFilterSlice.actions;

export default flightFilterSlice.reducer;
