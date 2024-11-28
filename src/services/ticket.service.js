import axiosInstance from '../api/axiosInstance';

export const getAllDestinations = async (page, limit) => {
  try {
    const response = await axiosInstance.get('/pagination/tickets', {
      params: { page: page, limit: limit },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.response?.data?.message,
    };
  }
};

export const getSeatLayout = async () => {
  try {
    const seatLayout = {
      totalRows: 12,
      totalSeats: 72,
      availableSeats: 64,
      leftColumns: ['A', 'B', 'C'],
      rightColumns: ['D', 'E', 'F'],
    };

    return {
      isSuccess: true,
      data: seatLayout,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

export const getDestinationById = async (id, callback) => {
  try {
    const response = await axiosInstance(`/destinations/${id}`);
    if (response.status === 200) {
      callback(response.data);
    } else {
      console.error(response);
    }
  } catch (error) {
    console.error(error);
  }
};

export const saveOrderDetails = async (passengers) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passengers }),
    });

    if (!response.ok) {
      throw new Error('Failed to save order details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// New Services

// Fetch all tickets with pagination
export const getAllTickets = async (page, limit) => {
  try {
    const response = await axiosInstance.get('/api/tiket', {
      params: { page, limit },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return { isSuccess: false, message: 'Failed to fetch tickets' };
    }
  } catch (error) {
    if (error.response) {
      return { isSuccess: false, message: error.response?.data?.message };
    } else {
      return {
        isSuccess: false,
        message: error.message || 'An unexpected error occurred',
      };
    }
  }
};

// Fetch ticket by ID
export const getTicketById = async (id_tiket) => {
  try {
    const response = await axiosInstance.get(`/api/tiket/${id_tiket}`);

    if (response.status === 200) {
      return response.data;
    } else {
      return { isSuccess: false, message: 'Ticket not found' };
    }
  } catch (error) {
    if (error.response) {
      return { isSuccess: false, message: error.response?.data?.message };
    } else {
      return {
        isSuccess: false,
        message: error.message || 'An unexpected error occurred',
      };
    }
  }
};

// Create a new ticket
export const createTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/api/tiket', ticketData);

    if (response.status === 201) {
      return response.data;
    } else {
      return { isSuccess: false, message: 'Failed to create ticket' };
    }
  } catch (error) {
    if (error.response) {
      return { isSuccess: false, message: error.response?.data?.message };
    } else {
      return {
        isSuccess: false,
        message: error.message || 'An unexpected error occurred',
      };
    }
  }
};

// Update an existing ticket
export const updateTicket = async (id_tiket, ticketData) => {
  try {
    const response = await axiosInstance.put(
      `/api/tiket/${id_tiket}`,
      ticketData
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return { isSuccess: false, message: 'Failed to update ticket' };
    }
  } catch (error) {
    if (error.response) {
      return { isSuccess: false, message: error.response?.data?.message };
    } else {
      return {
        isSuccess: false,
        message: error.message || 'An unexpected error occurred',
      };
    }
  }
};

// Search tickets
export const searchTickets = async (query, page, limit) => {
  try {
    const response = await axiosInstance.get('/api/tiket', {
      params: { search: query, page, limit },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return { isSuccess: false, message: 'No tickets found for this search' };
    }
  } catch (error) {
    if (error.response) {
      return { isSuccess: false, message: error.response?.data?.message };
    } else {
      return {
        isSuccess: false,
        message: error.message || 'An unexpected error occurred',
      };
    }
  }
};

// Filter tickets
export const filterTickets = async (filterParams, page, limit) => {
  try {
    const response = await axiosInstance.get('/api/tiket', {
      params: { ...filterParams, page, limit },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return {
        isSuccess: false,
        message: 'No tickets found for these filters',
      };
    }
  } catch (error) {
    if (error.response) {
      return { isSuccess: false, message: error.response?.data?.message };
    } else {
      return {
        isSuccess: false,
        message: error.message || 'An unexpected error occurred',
      };
    }
  }
};
