import { useState } from 'react';
import { getAllDestinations } from '../services/ticket.service';
import ImageDestination from '../../public/images/destination.jpeg';

export const useFetchAllDestinations = (destinationId) => {
  const [destination, setDestination] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAllDestinations = async () => {
    setLoading(true);
    setError(false);
    try {
      const travelData = [
        {
          id: 1,
          from: 'Jakarta',
          to: 'Bangkok',
          airline: 'AirAsia',
          date: '20 - 30 Maret 2023',
          price: '950.000',
          image: ImageDestination,
          badge: 'Limited!',
        },
        {
          id: 2,
          from: 'Jakarta',
          to: 'Bangkok',
          airline: 'AirAsia',
          date: '20 - 30 Maret 2023',
          price: '950.000',
          image: ImageDestination,
          badge: 'Limited!',
        },
        {
          id: 3,
          from: 'Jakarta',
          to: 'Sydney',
          airline: 'AirAsia',
          date: '5 - 25 Maret 2023',
          price: '3.650.000',
          image: ImageDestination,
          badge: '50% OFF',
        },
        {
          id: 4,
          from: 'Jakarta',
          to: 'Sydney',
          airline: 'AirAsia',
          date: '5 - 25 Maret 2023',
          price: '3.650.000',
          image: ImageDestination,
          badge: '50% OFF',
        },
        {
          id: 5,
          from: 'Jakarta',
          to: 'Bangkok',
          airline: 'AirAsia',
          date: '20 - 30 Maret 2023',
          price: '950.000',
          image: ImageDestination,
          badge: 'Limited!',
        },
      ];
      console.log('Aku Kepanggil');
      setDestination(travelData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { destination, loading, error, fetchAllDestinations };
};