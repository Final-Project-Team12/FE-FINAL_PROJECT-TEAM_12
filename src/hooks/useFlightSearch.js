import { useState } from 'react';

export const useFlightSearch = () => {
  // City states with default empty values
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  // Date states
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  // Passenger and seat states
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
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

  const handleFromCitySelection = (city) => {
    setFromCity(city);
  };

  const handleToCitySelection = (city) => {
    setToCity(city);
  };

  const handleSwapCities = () => {
    const tempCity = fromCity;
    setFromCity(toCity);
    setToCity(tempCity);
  };

  const getTotalPassengers = () => {
    const total =
      passengerCounts.adult + passengerCounts.child + passengerCounts.infant;
    return `${total} Penumpang`;
  };

  // Function to update all flight search fields at once
  const setFlightSearchData = (data) => {
    if (data.fromCity) setFromCity(data.fromCity);
    if (data.toCity) setToCity(data.toCity);
    if (data.departureDate) setDepartureDate(new Date(data.departureDate));
    if (data.selectedSeatClass) setSelectedSeatClass(data.selectedSeatClass);
    if (data.isRoundTrip !== undefined) setIsRoundTrip(data.isRoundTrip);
    if (data.passengerCounts) setPassengerCounts(data.passengerCounts);
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
    setIsRoundTrip,
    setPassengerCounts,
    setSelectedSeatClass,
    setIsFromModalOpen,
    setIsToModalOpen,
    setIsDepartureDateModalOpen,
    setIsReturnDateModalOpen,
    setIsPassengerSelectorOpen,
    setIsSeatClassModalOpen,
    setFlightSearchData,

    // Handlers
    handleFromCitySelection,
    handleToCitySelection,
    handleSwapCities,

    // Utility functions
    formatDate,
    getTotalPassengers,
  };
};
