import { useState, useEffect } from 'react';
import paymentService from '../services/paymentChecker.service';

const usePaymentStatus = (token) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const status = await paymentService.checkPaymentStatus(token);
        setPaymentStatus(status);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Error checking payment status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [token]);

  return { paymentStatus, loading, error };
};

export default usePaymentStatus;
