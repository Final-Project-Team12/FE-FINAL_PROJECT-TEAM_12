import axiosInstance from '../api/axiosInstance';

export const getFlightDetails = async (flightId) => {
  try {
    // Simulated API response
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
    // In a real application, you would make an API call here
    // const response = await axiosInstance.post('/api/orders', orderData);

    // Simulated API call
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

// Fetch Flights Destination
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
    const queryString = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 3,
      priceSort: params.priceSort || '',
      departureSort: params.departureSort || '',
      arrivalSort: params.arrivalSort || '',
      durationSort: params.durationSort || '',
      minPrice: params.minPrice || '',
      maxPrice: params.maxPrice || '',
      facilities: params.facilities?.join(',') || '',
    }).toString();

    const response = await axiosInstance.get(`/flights?${queryString}`);
    return response.data;
  },
};
