import { useState } from 'react';
import { flightService } from '../services/flight.service';

export const useFlightSearch = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState(
    flightService.defaultPassengerCounts
  );
  const [selectedSeatClass, setSelectedSeatClass] = useState('Economy');

  // Modal states
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [isDepartureDateModalOpen, setIsDepartureDateModalOpen] =
    useState(false);
  const [isReturnDateModalOpen, setIsReturnDateModalOpen] = useState(false);
  const [isPassengerSelectorOpen, setIsPassengerSelectorOpen] = useState(false);
  const [isSeatClassModalOpen, setIsSeatClassModalOpen] = useState(false);

  const formatDate = (date) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSwapCities = () => {
    const tempFrom = fromCity;
    setFromCity(toCity);
    setToCity(tempFrom);
  };

  const getTotalPassengers = () => {
    const total =
      passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
    return `${total} Penumpang`;
  };

  // Handle round trip toggle
  const handleRoundTripToggle = (value) => {
    setIsRoundTrip(value);
    if (!value) {
      // Reset return date when switching to one-way
      setReturnDate(new Date());
    }
  };

  // Handle return date selection
  const handleReturnDateSelect = (date) => {
    if (isRoundTrip && date >= departureDate) {
      setReturnDate(date);
      setIsReturnDateModalOpen(false);
    }
  };

  return {
    // States
    fromCity,
    toCity,
    departureDate,
    returnDate,
    isRoundTrip,
    passengerCounts,
    selectedSeatClass,
    isFromModalOpen,
    isToModalOpen,
    isDepartureDateModalOpen,
    isReturnDateModalOpen,
    isPassengerSelectorOpen,
    isSeatClassModalOpen,

    // Setters
    setFromCity,
    setToCity,
    setDepartureDate,
    setReturnDate,
    setIsRoundTrip: handleRoundTripToggle,
    setPassengerCounts,
    setSelectedSeatClass,
    setIsFromModalOpen,
    setIsToModalOpen,
    setIsDepartureDateModalOpen,
    setIsReturnDateModalOpen,
    setIsPassengerSelectorOpen,
    setIsSeatClassModalOpen,

    // Methods
    formatDate,
    handleSwapCities,
    getTotalPassengers,
    handleReturnDateSelect,
  };
};
