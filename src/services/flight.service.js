import axiosInstance from '../api/axiosInstance';

export const getFlightDetails = async (flightId) => {
  try {
    const flightDetails = {
      departure: {
        time: '07:00',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
      },
      arrival: {
        time: '11:00',
        date: '3 Maret 2023',
        airport: 'Melbourne International Airport',
      },
      flight: {
        airline: 'Jet Air - Economy',
        code: 'JT - 203',
        info: [
          'Baggage 20 kg',
          'Cabin baggage 7 kg',
          'In Flight Entertainment',
        ],
      },
      pricing: {
        adults: {
          count: 2,
          price: 9550000,
        },
        baby: {
          count: 1,
          price: 0,
        },
        tax: 300000,
      },
    };

    return {
      isSuccess: true,
      data: flightDetails,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

export const flightService = {
  cities: ['Jakarta', 'Surabaya', 'Bali', 'Yogyakarta', 'Medan'],

  seatClasses: ['Economy', 'Business', 'First Class'],

  defaultPassengerCounts: {
    adult: 1,
    child: 0,
    infant: 0,
  },
};

export const saveOrderData = async (orderData) => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order data saved:', orderData);
        resolve({ isSuccess: true, message: 'Order saved successfully' });
      }, 1000);
    });
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message || 'Failed to save order',
    };
  }
};

export const getFlights = async (page = 1, limit = 5) => {
  try {
    const response = await axiosInstance.get('/flights', {
      params: { page, limit },
    });

    if (response.status === 200) {
      return {
        isSuccess: true,
        data: response.data.data,
        pagination: response.data.pagination,
        message: response.data.message,
      };
    }

    throw new Error(response.data.message || 'Failed to fetch flights');
  } catch (error) {
    console.error('Error fetching flights:', error);
    return {
      isSuccess: false,
      message: error.response?.data?.message || 'Failed to fetch flights',
      data: null,
      pagination: null,
    };
  }
};

export const searchFlights = async (params) => {
  const queryParams = new URLSearchParams({
    from: params.fromCity,
    to: params.toCity,
    departureDate: formatDate(params.departureDate),
    ...(params.isRoundTrip && { returnDate: formatDate(params.returnDate) }),
    seatClass: params.selectedSeatClass,
    totalPassenger: getTotalPassengers(params.passengerCounts),
  });

  const response = await axiosInstance.get(`/flights?${queryParams}`);
  return response.data;
};

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getTotalPassengers = (passengerCounts) => {
  return Object.values(passengerCounts).reduce((sum, count) => sum + count, 0);
};

const formatDateForAPI = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const flightManagementAndBookingService = {
  async fetchAvailableFlightsWithFiltersAndPagination(params) {
    try {
      const queryParams = {
        page: params.page || 1,
        limit: params.limit || 3,
      };

      if (params.searchParams) {
        const {
          from,
          to,
          departureDate,
          returnDate,
          seatClass,
          passengerAdult,
          passengerChild,
          passengerInfant,
          isRoundTrip,
        } = params.searchParams;

        const formattedDepartureDate = formatDateForAPI(departureDate);
        const formattedReturnDate = formatDateForAPI(returnDate);

        if (from) queryParams.from = from;
        if (to) queryParams.to = to;
        if (formattedDepartureDate)
          queryParams.departureDate = formattedDepartureDate;
        if (seatClass) queryParams.seatClass = seatClass;
        if (passengerAdult) queryParams.passengerAdult = passengerAdult;
        if (passengerChild) queryParams.passengerChild = passengerChild;
        if (passengerInfant) queryParams.passengerInfant = passengerInfant;
        if (isRoundTrip !== undefined) queryParams.isRoundTrip = isRoundTrip;

        if (formattedReturnDate && isRoundTrip) {
          queryParams.returnDate = formattedReturnDate;
        }
      }

      if (params.filters?.facilities?.length > 0) {
        const facilityMapping = {
          meals: 'mealAvailable',
          wifi: 'wifiAvailable',
          power: 'powerOutlets',
        };

        const selectedFacilities = params.filters.facilities
          .map((facility) => facilityMapping[facility])
          .filter(Boolean);

        if (selectedFacilities.length > 0) {
          queryParams.facilities = selectedFacilities.join(',');
        }
      }

      if (params.filters) {
        const { minPrice, maxPrice } = params.filters;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;
      }

      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      try {
        const response = await axiosInstance.get(
          `/flights/search?${queryString}`
        );

        const filterFlightsBySeatClass = (flights) =>
          flights?.filter((flight) => {
            const seatInfo = flight.seats_detail.find(
              (seat) => seat.class === params.searchParams.seatClass
            );
            const totalPassengers =
              (params.searchParams.passengerAdult || 0) +
              (params.searchParams.passengerChild || 0) +
              (params.searchParams.passengerInfant || 0);
            return seatInfo && seatInfo.available_seats >= totalPassengers;
          }) || [];

        const filteredOutboundFlights = filterFlightsBySeatClass(
          response.data.data.outbound_flights
        );

        const filteredReturnFlights = response.data.data.return_flights
          ? filterFlightsBySeatClass(response.data.data.return_flights)
          : [];

        return {
          ...response.data,
          data: {
            outbound_flights: filteredOutboundFlights,
            return_flights: filteredReturnFlights,
          },
        };
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              return {
                data: {
                  outbound_flights: [],
                  return_flights: [],
                },
                pagination: {
                  totalItems: 0,
                  totalPages: 0,
                  currentPage: queryParams.page,
                  hasNextPage: false,
                },
              };
            case 400:
              throw new Error(
                'Invalid search parameters. Please check your input and try again.'
              );
            case 401:
              throw new Error(
                'Please login to continue searching for flights.'
              );
            case 403:
              throw new Error(
                'You do not have permission to access this resource.'
              );
            case 429:
              throw new Error('Too many requests. Please try again later.');
            case 500:
              throw new Error('Internal server error. Please try again later.');
            default:
              throw new Error(
                'An error occurred while searching for flights. Please try again.'
              );
          }
        } else if (error.request) {
          throw new Error(
            'Unable to connect to the server. Please check your internet connection.'
          );
        } else {
          throw new Error(
            'An error occurred while preparing your request. Please try again.'
          );
        }
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  },
};

export default flightManagementAndBookingService;
