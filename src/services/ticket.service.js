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

// export const getTicker = async (from, to, departure, return, passengers, ) => {
//     try {
//         const response = await axiosInstance('/api/tikket', {
//             params: {
//                 page: parseInt(page)
//             }
//         })
//     } catch (error) {

//     }
// }
