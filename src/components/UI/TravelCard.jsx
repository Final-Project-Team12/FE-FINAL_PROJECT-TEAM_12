import React from 'react';
import { Timer } from 'lucide-react';
import { FaArrowRightLong } from 'react-icons/fa6';

const TravelCard = ({ travel }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}j ${mins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-2 sm:p-3 flex flex-col hover:scale-105 transition-transform">
      <div className="relative">
        <img
          src={travel.destinationImage}
          alt={`${travel.from} to ${travel.to}`}
          className="w-full h-20 sm:h-24 object-cover rounded-lg"
        />

        <div className="absolute top-0 right-0 px-2 sm:px-2.5 py-1 rounded-e-none rounded-s-lg text-xs font-bold text-white bg-[#7126B5]">
          {travel.offers}
        </div>
      </div>

      <div className="mt-2 sm:mt-3 flex flex-col justify-between flex-1">
        <div className="flex items-center gap-1 sm:gap-1.5 text-sm sm:text-base font-semibold mb-1 sm:mb-1.5">
          <span>{travel.from}</span>
          <FaArrowRightLong className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{travel.to}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#7126B5] font-medium text-xs sm:text-sm mb-1 sm:mb-1.5">
          <img
            src={travel.airlineImage}
            alt={travel.airline}
            className="h-2 sm:h-2.5 w-auto object-contain"
          />
          <span>{travel.airline}</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
          <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>
            {formatDate(travel.departureTime)} -{' '}
            {formatDuration(travel.duration)}
          </span>
        </div>

        <div className="text-sm sm:text-base">
          Mulai dari{' '}
          <span className="text-red-500 font-bold">
            IDR {Number(travel.price).toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
