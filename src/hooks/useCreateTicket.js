import { useState } from 'react';
import { createTicket } from '../services/ticket.service';

export const useCreateTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewTicket = async (ticketData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await createTicket(ticketData);
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

  return { ticket, loading, error, createNewTicket };
};
