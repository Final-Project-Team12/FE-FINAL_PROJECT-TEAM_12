import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Timer } from 'lucide-react';
import ImageDestination from '../../../public/images/destination.jpeg';
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
    <div className="mt-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Destinasi Favorit</h2>

      <div className="flex flex-wrap gap-3">
        {continents.map((continent) => (
          <button
            key={continent.id}
            onClick={() => setActiveContinent(continent.id)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-colors ${
              activeContinent === continent.id
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-gray-700 hover:bg-purple-200'
            }`}
          >
            <Search size={18} />
            <span>{continent.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 px-4">
        {travelData.map((travel) => (
          <TravelCard key={travel.id} travel={travel} />
        ))}
      </div>
    </div>
  );
};

export default DestinationFilter;
