import { useState } from 'react';
import { paymentService } from '../services/payment.service';
import Swal from 'sweetalert2';

export const useOrderPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentToken, setPaymentToken] = useState(null);

  const initiateOrderPayment = async ({
    amount,
    customerDetails,
    productDetails,
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Input validation
      if (!amount || !customerDetails || !productDetails) {
        throw new Error('Missing required payment details');
      }

      if (
        !customerDetails.name ||
        !customerDetails.email ||
        !customerDetails.mobile_number
      ) {
        throw new Error('Missing required customer information');
      }

      // Prepare payment details
      const paymentDetails = {
        amount,
        customerDetails: {
          name: customerDetails.name,
          email: customerDetails.email,
          mobile_number: customerDetails.mobile_number,
          address: customerDetails.address || '',
        },
        productDetails: productDetails.map((product) => ({
          productId: product.productId,
          productName: product.productName,
          quantity: product.quantity || 1,
          price: product.price,
        })),
      };

      // Initiate payment using payment service
      const paymentResult =
        await paymentService.initiatePayment(paymentDetails);

      if (!paymentResult.isSuccess) {
        throw new Error(paymentResult.message || 'Payment initiation failed');
      }

      // Store the payment token
      if (paymentResult.data?.data?.payment?.snapToken) {
        setPaymentToken(paymentResult.data.data.payment.snapToken);
      }

      return {
        success: true,
        data: paymentResult.data,
        orderId: paymentResult.orderId,
        token: paymentResult.data?.data?.payment?.snapToken,
      };
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message || 'Failed to process payment',
      });
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatus = async (orderId) => {
    try {
      if (!orderId) {
        throw new Error('Order ID is required');
      }

      const result = await paymentService.getPaymentStatus(orderId);

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to get payment status');
      }

      return result.data;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const cancelPayment = async (orderId) => {
    setLoading(true);
    try {
      if (!orderId) {
        throw new Error('Order ID is required');
      }

      const result = await paymentService.cancelPayment(orderId);

      if (!result.isSuccess) {
        throw new Error(result.message || 'Failed to cancel payment');
      }

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Cancel Payment Failed',
        text: error.message || 'Failed to cancel payment',
      });
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    initiateOrderPayment,
    getPaymentStatus,
    cancelPayment,
    loading,
    error,
    paymentToken,
  };
};
