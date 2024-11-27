import { useState } from 'react';
import { getTicketById } from '../services/ticket.service';

export const useFetchTicketById = (id_tiket) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTicketById = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTicketById(id_tiket);
      if (data?.isSuccess === false) {
        throw new Error(data?.message);
      }
      setTicket(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { ticket, loading, error, fetchTicketById };
};
