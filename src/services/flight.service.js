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
          seatClass,
          totalPassenger,
          returnDate,
          isRoundTrip,
        } = params.searchParams;

        if (from) queryParams.from = from;
        if (to) queryParams.to = to;
        if (departureDate) queryParams.departureDate = departureDate;
        if (seatClass) queryParams.seatClass = seatClass;
        if (totalPassenger) queryParams.totalPassenger = totalPassenger;
        if (isRoundTrip && returnDate) queryParams.returnDate = returnDate;
      }

      if (params.filters) {
        const { minPrice, maxPrice, facilities } = params.filters;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;

        if (facilities?.length > 0) {
          facilities.forEach((facility) => {
            switch (facility) {
              case 'wifi':
                queryParams.wifi_available = true;
                break;
              case 'meals':
                queryParams.meal_available = true;
                break;
              case 'entertainment':
                queryParams.in_flight_entertainment = true;
                break;
              case 'power':
                queryParams.power_outlets = true;
                break;
            }
          });
        }
      }

      console.log('Final Query Parameters:', queryParams);

      const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await axiosInstance.get(
        `/flights/search?${queryString}`
      );

      let filteredFlights = response.data.data.outbound_flights;

      if (
        params.searchParams?.seatClass &&
        params.searchParams?.totalPassenger
      ) {
        filteredFlights = filteredFlights.filter((flight) => {
          const seatInfo = flight.seats_detail.find(
            (seat) => seat.class === params.searchParams.seatClass
          );
          return (
            seatInfo &&
            seatInfo.available_seats >=
              parseInt(params.searchParams.totalPassenger)
          );
        });
      }

      return {
        ...response.data,
        data: {
          ...response.data.data,
          outbound_flights: filteredFlights,
        },
      };
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  },
};
