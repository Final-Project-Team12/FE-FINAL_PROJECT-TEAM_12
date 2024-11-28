import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TravelCard from './TravelCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

const continents = [
  { id: 'all', name: 'Semua' },
  { id: 'asia', name: 'Asia' },
  { id: 'america', name: 'Amerika' },
  { id: 'australia', name: 'Australia' },
  { id: 'europe', name: 'Eropa' },
  { id: 'africa', name: 'Afrika' },
];

const DestinationFilter = ({ travelData, loading, showSkeleton }) => {
  const [activeContinent, setActiveContinent] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(travelData.length / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = travelData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mt-6 sm:mt-8 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Destinasi Favorit
      </h2>

      <div className="overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 min-w-min">
          {continents.map((continent) => (
            <button
              key={continent.id}
              onClick={() => {
                setActiveContinent(continent.id);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                activeContinent === continent.id
                  ? 'bg-[#7126B5] text-white'
                  : 'bg-purple-100 text-gray-700 hover:bg-purple-200'
              }`}
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{continent.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6 py-3 sm:py-4">
        {showSkeleton
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden p-2 sm:p-3 flex flex-col"
              >
                <Skeleton height={112} />
                <div className="mt-2 sm:mt-3 flex flex-col justify-between flex-1">
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="40%" height={16} />
                  <Skeleton width="50%" height={16} />
                  <Skeleton width="70%" height={20} />
                </div>
              </div>
            ))
          : currentItems.map((travel) => (
              <TravelCard key={travel.id} travel={travel} />
            ))}
      </div>

      {!showSkeleton && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 mb-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#7126B5] hover:bg-purple-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-[#7126B5] text-white'
                  : 'text-gray-600 hover:bg-purple-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#7126B5] hover:bg-purple-100'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationFilter;
