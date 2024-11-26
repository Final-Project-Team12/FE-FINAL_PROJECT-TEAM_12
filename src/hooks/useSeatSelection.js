import { useState, useEffect } from 'react';
import { getSeatLayout } from '../services/ticket.service';

export const useSeatSelection = (maxSeats) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLayout, setSeatLayout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSeatLayout = async () => {
    setLoading(true);
    try {
      const response = await getSeatLayout();
      if (response.isSuccess) {
        setSeatLayout(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeatLayout();
  }, []);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }
      if (prev.length < maxSeats) {
        return [...prev, seatId];
      }
      return prev;
    });
  };

  return {
    selectedSeats,
    seatLayout,
    loading,
    error,
    handleSeatSelect,
  };
};
