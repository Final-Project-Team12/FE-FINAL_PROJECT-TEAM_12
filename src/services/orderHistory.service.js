import axiosInstance from '../api/axiosInstance';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getOrderHistory = async () => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('Token not found. Please login again.');
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    const response = await axiosInstance.get(`transaction/user/${userId}`);
    console.log(response.data);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error(
        response.data?.message || 'Failed to fetch order history.'
      );
    }
  } catch (error) {
    throw (
      error.response?.data || {
        message:
          'An error occurred while fetching order history. Please try again.',
      }
    );
  }
};

// import axiosInstance from '../api/axiosInstance';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';

// export const orderHistory = async () => {
//   try {
//     const token = Cookies.get('token');
//     const decodedToken = jwtDecode(token);
//     const userId = decodedToken.user_id;

//     const response = await axiosInstance.get(`transaction/user/${userId}`);

//     console.log(response.data)
//     if (response.status === 'success') {
//       return response.data;
//     }
//   } catch (error) {
//     throw (
//       error.response?.data || {
//         message:
//           'An error occurred while fetching order details. Please try again.',
//       }
//     );
//   }
// };
