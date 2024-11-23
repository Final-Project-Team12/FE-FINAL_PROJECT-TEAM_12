import { Timer } from 'lucide-react';
import { FaArrowRightLong } from 'react-icons/fa6';

const TravelCard = ({ from, to, airline, date, price, image, badge }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative p-4 pt-4 pb-0">
        <div className="rounded-t-lg overflow-hidden relative">
          <img
            src={image}
            alt={`${from} to ${to}`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-l-lg">
            {badge}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-xl font-semibold mb-2">
          <span>{from}</span>
          <FaArrowRightLong size={16} />
          <span>{to}</span>
        </div>

        <div className="text-purple-600 font-medium mb-2">{airline}</div>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Timer size={16} />
          <span>{date}</span>
        </div>

        <div className="text-lg">
          Mulai dari <span className="text-red-500 font-bold">IDR {price}</span>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
