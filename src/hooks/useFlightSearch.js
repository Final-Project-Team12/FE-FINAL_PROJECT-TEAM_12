import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setSearchParams } from '../store/slices/flightFilterSlice';

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
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const handleFlightSearch = async (searchParams) => {
    try {
      setIsLoading(true);

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

      const formattedParams = {
        from: searchParams.fromCity,
        to: searchParams.toCity,
        departureDate: formatApiDate(searchParams.departureDate),
        returnDate: searchParams.isRoundTrip
          ? formatApiDate(searchParams.returnDate)
          : undefined,
        seatClass: searchParams.selectedSeatClass,
        totalPassenger: totalPassengers,
        isRoundTrip: searchParams.isRoundTrip,
      };

      dispatch(setSearchParams(formattedParams));

      navigate('/flight-ticket');
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
