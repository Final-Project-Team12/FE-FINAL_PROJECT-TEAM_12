import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Timer } from 'lucide-react';
import TravelCard from './TravelCard';

const continents = [
  { id: 'all', name: 'Semua' },
  { id: 'asia', name: 'Asia' },
  { id: 'america', name: 'Amerika' },
  { id: 'australia', name: 'Australia' },
  { id: 'europe', name: 'Eropa' },
  { id: 'africa', name: 'Afrika' },
];

const DestinationFilter = ({ travelData }) => {
  const [activeContinent, setActiveContinent] = useState('all');

  return (
    <div className="mt-6 sm:mt-8 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
        Destinasi Favorit
      </h2>

      {/* Scrollable container for filter buttons on mobile */}
      <div className="overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 min-w-min">
          {continents.map((continent) => (
            <button
              key={continent.id}
              onClick={() => setActiveContinent(continent.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-sm sm:text-base transition-colors ${
                activeContinent === continent.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-gray-700 hover:bg-purple-200'
              }`}
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span>{continent.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6 py-3 sm:py-4">
        {travelData.map((travel) => (
          <TravelCard key={travel.id} travel={travel} />
        ))}
      </div>
    </div>
  );
};

export default DestinationFilter;
