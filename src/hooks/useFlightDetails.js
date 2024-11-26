import { useState } from 'react';
import { getFlightDetails } from '../services/flight.service';

const useFlightDetails = (flightId) => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlightDetails = async () => {
    setLoading(true);
    try {
      const response = await getFlightDetails(flightId);
      if (response.isSuccess) {
        setFlightDetails(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { flightDetails, loading, error, fetchFlightDetails };
};

export default useFlightDetails;
