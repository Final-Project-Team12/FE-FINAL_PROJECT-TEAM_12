import React, { useState, useEffect } from 'react';

const PaymentStatusMonitor = ({ orderId, initialStatus, onStatusChange }) => {
  const [paymentStatus, setPaymentStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkPaymentStatus = async () => {
    // Hindari multiple request jika masih loading
    if (isLoading) return false;

    try {
      setIsLoading(true);
      const paymentResponse = await fetch(`/payments/${orderId}/status`, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to fetch payment status');
      }

      const paymentData = await paymentResponse.json();
      const midtransStatus = paymentData.data.midtransStatus.transaction_status;
      console.log('Midtrans status:', midtransStatus);

      // Jika status pembayaran berhasil (SETTLEMENT)
      if (midtransStatus === 'settlement') {
        setPaymentStatus('SUCCESS');
        if (onStatusChange) {
          onStatusChange('SUCCESS');
        }
        return true;
      }

      const newStatus = midtransStatus.toUpperCase();
      setPaymentStatus(newStatus);
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
      return false;
    } catch (err) {
      console.error('Error checking payment status:', err);
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isSubscribed = true; // Flag untuk mengontrol cleanup
    let intervalId = null;

    const startPolling = async () => {
      // Hanya lakukan polling jika komponen masih mounted
      if (!isSubscribed) return;

      // Cek status pertama kali
      const isComplete = await checkPaymentStatus();

      // Jika sudah selesai, tidak perlu mulai interval
      if (isComplete) return;

      // Mulai interval polling jika belum selesai
      intervalId = setInterval(async () => {
        if (!isSubscribed) return;

        const isComplete = await checkPaymentStatus();
        if (isComplete && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 5000);
    };

    // Hanya mulai polling jika status PENDING
    if (initialStatus === 'PENDING') {
      startPolling();
    }

    // Cleanup function
    return () => {
      isSubscribed = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, [initialStatus, orderId]); // Tambahkan dependencies yang dibutuhkan

  return null;
};

export default PaymentStatusMonitor;
