import axiosInstance from '../api/axiosInstance';

export const printTicket = async (dataPrintTicket) => {
  try {
    const response = await axiosInstance.post('/ticket', dataPrintTicket);

    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Print tiket gagal' };
  }
};
