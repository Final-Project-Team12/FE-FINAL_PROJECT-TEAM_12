import React from 'react';
import { Timer } from 'lucide-react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {
  updateFlightSearch,
  setSeatPrices,
} from '../../store/slices/flightSearchSlice';

const TravelCard = ({ travel }) => {
  const dispatch = useDispatch();

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getApiDate = (dateString) => {
    return new Date(dateString);
  };

  const getFlightPrices = (seatsDetail) => {
    const priceMap = {};
    seatsDetail.forEach((seat) => {
      if (seat.class === 'Economy Premium') {
        priceMap['Premium Economy'] = seat.price;
      } else {
        priceMap[seat.class] = seat.price;
      }
    });
    return priceMap;
  };

  const getEconomyClass = (seatsDetail) => {
    return seatsDetail.find((seat) => seat.class === 'Economy');
  };

  const handleCardClick = () => {
    const economyClass = getEconomyClass(travel.seats_detail);
    const seatPrices = getFlightPrices(travel.seats_detail);

    if (!economyClass) return;

    const departureDate = getApiDate(travel.departure_time);

    dispatch(setSeatPrices(seatPrices));
    dispatch(
      updateFlightSearch({
        fromCity: travel.origin_airport.airport_code,
        toCity: travel.destination_airport.airport_code,
        departureDate: departureDate,
        departureDateDisplay: formatDisplayDate(travel.departure_time),
        selectedSeatClass: 'Economy',
        isRoundTrip: false,
        passengerCounts: {
          adult: 1,
          child: 0,
          infant: 0,
        },
        selectedFlight: travel,
        fromCityDisplay: `${travel.origin_airport.name} (${travel.origin_airport.airport_code})`,
        toCityDisplay: `${travel.destination_airport.name} (${travel.destination_airport.airport_code})`,
      })
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const economyClass = getEconomyClass(travel.seats_detail);

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden p-2 sm:p-3 flex flex-col hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="relative">
        <img
          src={travel.destination_airport.image_url}
          alt={`${travel.origin_airport.name} to ${travel.destination_airport.name}`}
          className="w-full h-20 sm:h-24 object-cover rounded-lg"
        />
        <div className="absolute top-0 right-0 px-2 sm:px-2.5 py-1 rounded-e-none rounded-s-lg text-xs font-bold text-white bg-[#7126B5]">
          {travel.offers}
        </div>
      </div>

      <div className="mt-2 sm:mt-3 flex flex-col justify-between flex-1">
        <div className="flex items-center gap-1 sm:gap-1.5 text-sm sm:text-base font-semibold mb-1 sm:mb-1.5">
          <span className="text-sm truncate">{travel.origin_airport.name}</span>
          <FaArrowRightLong className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-sm truncate">
            {travel.destination_airport.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[#7126B5] font-medium text-xs sm:text-sm mb-1 sm:mb-1.5">
          <img
            src={travel.airline.image_url}
            alt={travel.airline.airline_name}
            className="h-2 sm:h-2.5 w-auto object-contain"
          />
          <span>{travel.airline.airline_name}</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
          <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{formatDisplayDate(travel.departure_time)}</span>
        </div>

        <div className="text-sm sm:text-xs">
          Mulai dari{' '}
          <span className="text-red-500 font-bold">
            IDR {economyClass?.price.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
