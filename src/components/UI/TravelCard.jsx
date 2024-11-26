import React from 'react';
import { Timer } from 'lucide-react';
import { FaArrowRightLong } from 'react-icons/fa6';

const TravelCard = ({ travel }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-3 sm:p-4 flex flex-col">
      <div className="relative">
        <img
          src={travel.image}
          alt={`${travel.from} to ${travel.to}`}
          className="w-full h-36 sm:h-48 object-cover rounded-lg"
        />

        <div className="absolute top-0 right-0 px-2 sm:px-3 py-1 rounded-e-none rounded-s-lg text-xs sm:text-sm font-bold text-white bg-purple-500">
          {travel.badge}
        </div>
      </div>

      <div className="mt-3 sm:mt-4 flex flex-col justify-between flex-1">
        <div className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">
          <span>{travel.from}</span>
          <FaArrowRightLong className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{travel.to}</span>
        </div>

        <div className="text-purple-600 font-medium text-sm sm:text-base mb-1.5 sm:mb-2">
          {travel.airline}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
          <Timer className="w-4 h-4 sm:w-[16px] sm:h-[16px]" />
          <span>{travel.date}</span>
        </div>

        <div className="text-base sm:text-lg">
          Mulai dari{' '}
          <span className="text-red-500 font-bold">IDR {travel.price}</span>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
