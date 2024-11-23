import React from 'react';
import { Timer } from 'lucide-react';
import { FaArrowRightLong } from 'react-icons/fa6';

const TravelCard = ({ travel }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col">
      <div className="relative">
        <img
          src={travel.image}
          alt={`${travel.from} to ${travel.to}`}
          className="w-full h-48 object-cover rounded-lg"
        />

        <div className="absolute top-0 right-0 px-3 py-1 rounded-e-none rounded-s-lg text-sm font-bold text-white bg-purple-500">
          {travel.badge}
        </div>
      </div>

      <div className="mt-4 flex flex-col justify-between flex-1">
        <div className="flex items-center gap-2 text-lg font-semibold mb-2">
          <span>{travel.from}</span>
          <FaArrowRightLong size={16} />
          <span>{travel.to}</span>
        </div>

        <div className="text-purple-600 font-medium mb-2">{travel.airline}</div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Timer size={16} />
          <span>{travel.date}</span>
        </div>

        <div className="text-lg">
          Mulai dari{' '}
          <span className="text-red-500 font-bold">IDR {travel.price}</span>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
