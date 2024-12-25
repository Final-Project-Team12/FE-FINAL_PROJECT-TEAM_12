import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  fetchFilteredFlights,
  goToNextPage,
  setSearchParams,
} from '../../store/slices/flightFilterSlice';
import { updateFlightSearch } from '../../store/slices/flightSearchSlice';
import LoadingTicket from './LoadingTicket';
import SearchResultEmpty from './SearchResultEmpety';
import iconBaggage from '../../../public/icons/icon-baggage.svg';

const DetailsTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);

  const {
    filteredFlights,
    isLoading,
    error,
    hasMoreFlights,
    currentPageNumber,
    activeFilters,
  } = useSelector((state) => state.flightFilter);

  const {
    fromCity,
    toCity,
    fromCityDisplay,
    toCityDisplay,
    departureDate,
    returnDate,
    selectedSeatClass,
    passengerCounts,
    isRoundTrip,
    selectedDepartureFlight,
  } = useSelector((state) => state.flightSearch);

  const [openId, setOpenId] = useState(null);
  const isRequestInProgress = useRef(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';

      const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ];

      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const day = date.getDate();

      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  const formatDateForAPI = (date) => {
    if (!date) return '';
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return '';

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date for API:', error);
      return '';
    }
  };

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleSelectFlight = (flight) => {
    if (!selectedDepartureFlight) {
      const searchPayload = {
        from: fromCity,
        to: toCity,
        departureDate: formatDateForAPI(departureDate),
        seatClass: selectedSeatClass,
        passengerAdult: passengerCounts.adult || 0,
        passengerChild: passengerCounts.child || 0,
        passengerInfant: passengerCounts.infant || 0,
        isRoundTrip,
      };

      if (isRoundTrip) {
        dispatch(
          updateFlightSearch({
            selectedDepartureFlight: flight,
            departureDateDisplay: formatDate(flight.departure_time),
            searchPayload,
          })
        );

        const returnSearchParams = {
          from: flight.destination_airport.airport_code,
          to: flight.origin_airport.airport_code,
          fromCityDisplay: `${flight.destination_airport.name} (${flight.destination_airport.airport_code})`,
          toCityDisplay: `${flight.origin_airport.name} (${flight.origin_airport.airport_code})`,
        };

        const returnDate = new Date(departureDate);
        returnDate.setHours(0, 0, 0, 0);

        dispatch(
          setSearchParams({
            ...returnSearchParams,
            departureDate: formatDateForAPI(returnDate),
            isRoundTrip: true,
          })
        );

        dispatch(
          fetchFilteredFlights({
            page: 1,
            filters: activeFilters,
            searchParams: {
              ...returnSearchParams,
              departureDate: formatDateForAPI(returnDate),
              seatClass: selectedSeatClass,
              passengerAdult: passengerCounts.adult || 0,
              passengerChild: passengerCounts.child || 0,
              passengerInfant: passengerCounts.infant || 0,
              isRoundTrip: true,
            },
          })
        );
      } else {
        dispatch(
          updateFlightSearch({
            selectedDepartureFlight: flight,
            departureDateDisplay: formatDate(flight.departure_time),
            searchPayload,
          })
        );
        navigate(`/checkout/${flight.plane_id}`);
      }
    } else if (isRoundTrip) {
      dispatch(
        updateFlightSearch({
          selectedReturnFlight: flight,
          returnDateDisplay: formatDate(flight.departure_time),
        })
      );
      navigate(
        `/checkout/${selectedDepartureFlight.plane_id}/${flight.plane_id}`
      );
    }
  };

  const observer = useRef();
  const lastFlightElementRef = useCallback(
    (node) => {
      if (isLoading || !hasMoreFlights || isRequestInProgress.current) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            dispatch(goToNextPage());
          }
        },
        { rootMargin: '20px', threshold: 0.1 }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreFlights, dispatch]
  );

  const currentFlights = useMemo(() => {
    return selectedDepartureFlight && isRoundTrip
      ? filteredFlights.return_flights || []
      : filteredFlights.outbound_flights || [];
  }, [selectedDepartureFlight, isRoundTrip, filteredFlights]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!fromCity || !toCity || !departureDate) {
        navigate('/');
        return;
      }

      const initialSearchPayload = {
        from: fromCity,
        to: toCity,
        departureDate: formatDateForAPI(departureDate),
        seatClass: selectedSeatClass,
        passengerAdult: passengerCounts.adult || 0,
        passengerChild: passengerCounts.child || 0,
        passengerInfant: passengerCounts.infant || 0,
        isRoundTrip,
      };

      dispatch(setSearchParams(initialSearchPayload));
    }
  }, []);

  useEffect(() => {
    if (isRequestInProgress.current) return;

    const fetchData = async () => {
      isRequestInProgress.current = true;
      try {
        const currentDate =
          isRoundTrip && selectedDepartureFlight ? returnDate : departureDate;
        const formattedCurrentDate = formatDateForAPI(currentDate);

        if (!formattedCurrentDate) {
          console.error('Invalid date format');
          return;
        }

        const searchPayload = {
          from: fromCity,
          to: toCity,
          departureDate: formattedCurrentDate,
          seatClass: selectedSeatClass,
          passengerAdult: passengerCounts.adult || 0,
          passengerChild: passengerCounts.child || 0,
          passengerInfant: passengerCounts.infant || 0,
          isRoundTrip,
        };

        if (selectedDepartureFlight && returnDate && isRoundTrip) {
          searchPayload.returnDate = formatDateForAPI(returnDate);
        }

        await dispatch(
          fetchFilteredFlights({
            page: currentPageNumber,
            filters: activeFilters,
            searchParams: searchPayload,
          })
        );
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        isRequestInProgress.current = false;
      }
    };

    if (fromCity && toCity && departureDate) {
      fetchData();
    }
  }, [
    dispatch,
    currentPageNumber,
    activeFilters,
    fromCity,
    toCity,
    departureDate,
    returnDate,
    selectedSeatClass,
    passengerCounts,
    selectedDepartureFlight,
    isRoundTrip,
  ]);

  if (error) {
    return (
      <div className="w-full px-4 py-8 text-center text-red-600">{error}</div>
    );
  }

  if (!isLoading && (!currentFlights || currentFlights.length === 0)) {
    return (
      <div className="lg:w-2/3 lg:ml-[20%]">
        <SearchResultEmpty />
      </div>
    );
  }

  return (
    <div className="w-full pb-4 space-y-4">
      {isLoading && <LoadingTicket />}
      {!isLoading &&
        currentFlights.map((flight, index) => (
          <div
            key={flight.plane_id}
            ref={
              index === currentFlights.length - 1 ? lastFlightElementRef : null
            }
            className={`border-2 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-200 ${
              openId === flight.plane_id
                ? 'border-purple-500'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded">
                    <img
                      src={flight.airline.image_url}
                      alt={flight.airline.airline_name}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="text-[12px] font-medium">
                    {`${flight.airline.airline_name} - ${
                      flight.seats_detail.find(
                        (seat) => seat.class === selectedSeatClass
                      )?.class || flight.seats_detail[0].class
                    }`}
                  </span>
                </div>
                <button
                  onClick={() => toggleAccordion(flight.plane_id)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform duration-200 ${
                      openId === flight.plane_id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="mt-2 flex flex-col items-center md:flex-row md:justify-between">
                <div className="flex items-center space-x-4 md:pl-10">
                  <div className="text-left">
                    <div className="text-[14px] font-bold">
                      {formatTime(flight.departure_time)}
                    </div>
                    <div className="text-[12px]">
                      {flight.origin_airport.airport_code}
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-[12px] text-[#8A8A8A]">
                      {`${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`}
                    </div>
                    <img src="/icons/Arrow.svg" alt="" />
                    <div className="text-[12px] text-[#8A8A8A]">Direct</div>
                  </div>

                  <div className="text-left">
                    <div className="text-[14px] font-bold">
                      {formatTime(flight.arrival_time)}
                    </div>
                    <div className="text-[12px]">
                      {flight.destination_airport.airport_code}
                    </div>
                  </div>

                  <img src={iconBaggage} alt="" />
                </div>

                <div className="w-full mt-3 flex justify-between md:w-1/4 md:text-right md:block md:mt-0">
                  <div className="text-[16px] font-bold text-purple-600">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(
                      flight.seats_detail.find(
                        (seat) => seat.class === selectedSeatClass
                      )?.price || flight.seats_detail[0].price
                    )}
                  </div>
                  <button
                    className={`
                    mt-1 px-6 py-1 rounded-md text-sm transition-colors duration-200
                    ${
                      flight.seats_detail.find(
                        (seat) => seat.class === selectedSeatClass
                      )?.available_seats > 0
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                    }
                  `}
                    onClick={() => handleSelectFlight(flight)}
                    disabled={
                      flight.seats_detail.find(
                        (seat) => seat.class === selectedSeatClass
                      )?.available_seats === 0
                    }
                  >
                    {flight.seats_detail.find(
                      (seat) => seat.class === selectedSeatClass
                    )?.available_seats > 0
                      ? 'Pilih'
                      : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>

            {openId === flight.plane_id && (
              <div className="p-4 bg-white border-t">
                <div className="space-y-4">
                  <div>
                    <hr className="mb-[22px] border-[#8A8A8A]" />
                    <h3 className="text-[14px] font-bold text-[#4B1979] mb-2">
                      Detail Penerbangan
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <div className="text-[16px] font-bold">
                            {formatTime(flight.departure_time)}
                          </div>
                          <p className="text-[12px] font-bold text-[#A06ECE]">
                            Keberangkatan
                          </p>
                        </div>
                        <div className="text-[14px]">
                          {formatDate(flight.departure_time)}
                        </div>
                        <div className="text-[14px] font-medium">
                          {`${flight.origin_airport.name} - ${flight.departure_terminal}`}
                        </div>
                      </div>

                      <hr className="w-1/2 mx-auto" />

                      <div className="flex flex-row gap-3">
                        <img
                          src={flight.airline.image_url}
                          alt={flight.airline.airline_name}
                          className="w-12 h-12 object-contain"
                        />
                        <div className="flex flex-col gap-3">
                          <div>
                            <div className="text-[14px] font-bold">
                              {flight.airline.airline_name}
                            </div>
                            <div className="text-[14px] font-bold">
                              {flight.plane_code}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-[14px] font-bold">
                              Informasi:
                            </h3>
                            <p className="text-[14px]">
                              Baggage {flight.baggage_capacity}kg
                            </p>
                            <p className="text-[14px]">
                              Cabin baggage {flight.cabin_baggage_capacity}kg
                            </p>
                            <p className="text-[14px]">
                              {flight.in_flight_entertainment
                                ? 'In Flight Entertainment'
                                : 'No Entertainment'}
                            </p>
                            <p className="text-[14px]">
                              {flight.meal_available
                                ? 'Meals Provided'
                                : 'No Meals'}
                            </p>
                            <p className="text-[14px]">
                              {flight.wifi_available
                                ? 'WiFi Available'
                                : 'No WiFi'}
                            </p>
                            <p className="text-[14px]">
                              {flight.power_outlets
                                ? 'Power Outlets Available'
                                : 'No Power Outlets'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <hr className="w-1/2 mx-auto" />

                      <div>
                        <div className="flex justify-between">
                          <div className="text-[14px] font-bold">
                            {formatTime(flight.arrival_time)}
                          </div>
                          <p className="text-[12px] font-bold text-[#A06ECE]">
                            Kedatangan
                          </p>
                        </div>
                        <div className="text-[14px]">
                          {formatDate(flight.arrival_time)}
                        </div>
                        <div className="text-[14px] font-medium">
                          {flight.destination_airport.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default DetailsTicket;
