import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { flightManagementAndBookingService } from '../../services/flight.service';

const formatDateForComparison = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const fetchFilteredFlights = createAsyncThunk(
  'flightFilter/fetchFilteredFlights',
  async (
    { page = 1, filters = {}, searchParams = {} },
    { rejectWithValue }
  ) => {
    try {
      const formattedSearchParams = {
        from: searchParams.from,
        to: searchParams.to,
        departureDate: searchParams.departureDate
          ? formatDateForComparison(searchParams.departureDate)
          : undefined,
        returnDate: searchParams.returnDate
          ? formatDateForComparison(searchParams.returnDate)
          : undefined,
        seatClass: searchParams.seatClass,
        passengerAdult: searchParams.passengerAdult,
        passengerChild: searchParams.passengerChild,
        passengerInfant: searchParams.passengerInfant,
        isRoundTrip: searchParams.isRoundTrip,
      };

      const response =
        await flightManagementAndBookingService.fetchAvailableFlightsWithFiltersAndPagination(
          {
            page,
            limit: 5,
            filters,
            searchParams: formattedSearchParams,
          }
        );

      let filteredOutboundFlights = response.data.outbound_flights || [];
      let filteredReturnFlights = response.data.return_flights || [];

      if (filters.departureDate) {
        const selectedDateStr = formatDateForComparison(filters.departureDate);
        filteredOutboundFlights = filteredOutboundFlights.filter((flight) => {
          const flightDateStr = formatDateForComparison(flight.departure_time);
          return flightDateStr === selectedDateStr;
        });

        if (searchParams.returnDate) {
          const returnDateStr = formatDateForComparison(
            searchParams.returnDate
          );
          filteredReturnFlights = filteredReturnFlights.filter((flight) => {
            const flightDateStr = formatDateForComparison(
              flight.departure_time
            );
            return flightDateStr === returnDateStr;
          });
        }
      }

      if (filters.facilities?.length > 0) {
        const filterFlightsByFacilities = (flights) => {
          return flights.filter((flight) => {
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
        };

        filteredOutboundFlights = filterFlightsByFacilities(
          filteredOutboundFlights
        );
        if (searchParams.isRoundTrip) {
          filteredReturnFlights = filterFlightsByFacilities(
            filteredReturnFlights
          );
        }
      }

      if (filters.minPrice || filters.maxPrice) {
        const filterFlightsByPrice = (flights) => {
          return flights.filter((flight) => {
            const price =
              flight.seats_detail.find(
                (seat) => seat.class === searchParams.seatClass
              )?.price || flight.seats_detail[0].price;

            return (
              (!filters.minPrice || price >= filters.minPrice) &&
              (!filters.maxPrice || price <= filters.maxPrice)
            );
          });
        };

        filteredOutboundFlights = filterFlightsByPrice(filteredOutboundFlights);
        if (searchParams.isRoundTrip) {
          filteredReturnFlights = filterFlightsByPrice(filteredReturnFlights);
        }
      }

      return {
        data: {
          outbound_flights: filteredOutboundFlights,
          return_flights: filteredReturnFlights,
        },
        pagination: {
          ...response.pagination,
          totalItems:
            filteredOutboundFlights.length + filteredReturnFlights.length,
          totalPages: Math.ceil(
            (filteredOutboundFlights.length + filteredReturnFlights.length) / 3
          ),
          hasNextPage:
            filteredOutboundFlights.length + filteredReturnFlights.length >
            page * 3,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch flights');
    }
  }
);

const sortFlights = (flights, criteria) => {
  if (!flights || !Array.isArray(flights)) return [];
  return [...flights].sort((a, b) => {
    switch (criteria) {
      case 'price_asc':
        return (
          (a.seats_detail[0]?.price || 0) - (b.seats_detail[0]?.price || 0)
        );
      case 'price_desc':
        return (
          (b.seats_detail[0]?.price || 0) - (a.seats_detail[0]?.price || 0)
        );
      case 'duration_asc':
        return (a.duration || 0) - (b.duration || 0);
      case 'duration_desc':
        return (b.duration || 0) - (a.duration || 0);
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

const initialState = {
  filteredFlights: {
    outbound_flights: [],
    return_flights: [],
  },
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
  searchParams: {
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    seatClass: '',
    passengerAdult: 1,
    passengerChild: 0,
    passengerInfant: 0,
    isRoundTrip: false,
  },
  sortCriteria: 'price_asc',
};

const flightFilterSlice = createSlice({
  name: 'flightFilter',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
      if (
        action.payload.from ||
        action.payload.to ||
        action.payload.departureDate
      ) {
        state.filteredFlights = { outbound_flights: [], return_flights: [] };
        state.currentPageNumber = 1;
        state.hasMoreFlights = true;
      }
    },
    setActiveFilters: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
      state.currentPageNumber = 1;
    },
    clearAllFilters: (state) => {
      return { ...initialState, searchParams: state.searchParams };
    },
    goToNextPage: (state) => {
      state.currentPageNumber += 1;
    },
    setSortCriteria: (state, action) => {
      state.sortCriteria = action.payload;
      if (state.filteredFlights.outbound_flights?.length) {
        state.filteredFlights.outbound_flights = sortFlights(
          state.filteredFlights.outbound_flights,
          action.payload
        );
      }
      if (
        state.searchParams.isRoundTrip &&
        state.filteredFlights.return_flights?.length
      ) {
        state.filteredFlights.return_flights = sortFlights(
          state.filteredFlights.return_flights,
          action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredFlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredFlights.fulfilled, (state, action) => {
        const { outbound_flights, return_flights } = action.payload.data;
        if (state.currentPageNumber === 1) {
          state.filteredFlights = {
            outbound_flights: sortFlights(
              outbound_flights || [],
              state.sortCriteria
            ),
            return_flights: return_flights
              ? sortFlights(return_flights, state.sortCriteria)
              : [],
          };
        } else {
          const newOutboundFlights = (outbound_flights || []).filter(
            (flight) =>
              !state.filteredFlights.outbound_flights.find(
                (f) => f.plane_id === flight.plane_id
              )
          );

          const newReturnFlights = (return_flights || []).filter(
            (flight) =>
              !state.filteredFlights.return_flights.find(
                (f) => f.plane_id === flight.plane_id
              )
          );

          state.filteredFlights = {
            outbound_flights: sortFlights(
              [
                ...state.filteredFlights.outbound_flights,
                ...newOutboundFlights,
              ],
              state.sortCriteria
            ),
            return_flights: return_flights
              ? sortFlights(
                  [
                    ...state.filteredFlights.return_flights,
                    ...newReturnFlights,
                  ],
                  state.sortCriteria
                )
              : state.filteredFlights.return_flights,
          };
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
  setSearchParams,
  setActiveFilters,
  clearAllFilters,
  goToNextPage,
  setSortCriteria,
} = flightFilterSlice.actions;

export default flightFilterSlice.reducer;
