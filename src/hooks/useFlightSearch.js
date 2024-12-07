import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { searchFlights } from '../services/flight.service';
import {
  updateFlightSearch,
  setSeatPrices,
} from '../store/slices/flightSearchSlice';

export const useFlightSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatApiDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string' && date.includes('-')) {
      return date;
    }
    const d = new Date(date);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  };

  const handleFlightSearch = async (searchParams) => {
    try {
      setIsLoading(true);

      // Validate required fields
      if (
        !searchParams.fromCity ||
        !searchParams.toCity ||
        !searchParams.departureDate ||
        (searchParams.isRoundTrip && !searchParams.returnDate)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all required fields',
          confirmButtonColor: '#7126B5',
        });
        return;
      }

      // Validate total passengers
      const totalPassengers = Object.values(
        searchParams.passengerCounts
      ).reduce((sum, count) => sum + count, 0);
      if (totalPassengers === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Passenger Count',
          text: 'Please select at least one passenger',
          confirmButtonColor: '#7126B5',
        });
        return;
      }

      const response = await searchFlights({
        ...searchParams,
        departureDate: formatApiDate(searchParams.departureDate),
        returnDate: searchParams.isRoundTrip
          ? formatApiDate(searchParams.returnDate)
          : undefined,
      });

      if (response.status === 'Success') {
        dispatch(
          updateFlightSearch({
            searchResults: response.data,
            selectedFlight: null,
          })
        );

        if (
          response.data.outbound_flights &&
          response.data.outbound_flights[0]
        ) {
          const seatPrices =
            response.data.outbound_flights[0].seats_detail.reduce(
              (acc, seat) => ({
                ...acc,
                [seat.class]: seat.price,
              }),
              {}
            );
          dispatch(setSeatPrices(seatPrices));
        }

        // Navigate to results page
        navigate('/flight-ticket');
      } else {
        throw new Error('Failed to fetch flights');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Search Failed',
        text: 'Unable to fetch flight results. Please try again.',
        confirmButtonColor: '#7126B5',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleFlightSearch,
  };
};
