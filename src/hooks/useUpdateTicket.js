import { useState } from 'react';
import { updateTicket } from '../services/ticket.service';

export const useUpdateTicket = (id_tiket) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTicketDetails = async (ticketData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await updateTicket(id_tiket, ticketData);
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

  return { ticket, loading, error, updateTicketDetails };
};
