import { useState } from 'react';
import { getAllTickets } from '../services/ticket.service';

export const useFetchAllTickets = (page = 1, limit = 10) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllTickets(page, limit);
      if (data?.isSuccess === false) {
        throw new Error(data?.message);
      }
      setTickets(data?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { tickets, loading, error, fetchAllTickets };
};
