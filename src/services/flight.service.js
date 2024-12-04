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

export const getFlights = async (page = 1, limit = 20) => {
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
