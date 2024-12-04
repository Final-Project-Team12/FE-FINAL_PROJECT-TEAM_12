import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TravelCard from './TravelCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFlights } from '../../hooks/useFlight';

const ITEMS_PER_PAGE = 10;

const continents = [
  { id: 'all', name: 'Semua' },
  { id: 'asia', name: 'Asia' },
  { id: 'america', name: 'Amerika Utara' },
  { id: 'south_america', name: 'Amerika Selatan' },
  { id: 'australia', name: 'Australia' },
  { id: 'europe', name: 'Eropa' },
  { id: 'africa', name: 'Afrika' },
  { id: 'antarctica', name: 'Antartika' },
];

const DestinationFilter = () => {
  const [activeContinent, setActiveContinent] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { flights, loading, error, pagination, fetchFlights } = useFlights();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchFlights(currentPage, ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredFlights = flights.outbound_flights.filter((flight) => {
    if (activeContinent === 'all') return true;
    return flight.destination_airport.continent.name
      .toLowerCase()
      .includes(activeContinent);
  });

  const mapFlightToTravelCard = (flight) => ({
    id: flight.plane_id,
    from: flight.origin_airport.name,
    to: flight.destination_airport.name,
    airline: flight.airline.airline_name,
    airlineImage: flight.airline.image_url,
    departureTime: flight.departure_time,
    duration: flight.duration,
    price: flight.seats_detail[0]?.price,
    destinationImage: flight.destination_airport.image_url,
    offers: flight.offers,
  });

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

      {error && <div className="text-red-500 text-center my-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mt-4 sm:mt-6 py-3 sm:py-4">
        {showSkeleton || loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden p-2 sm:p-3 flex flex-col"
              >
                <Skeleton height={96} />
                <div className="mt-2 sm:mt-3 flex flex-col justify-between flex-1">
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="40%" height={12} />
                  <Skeleton width="50%" height={12} />
                  <Skeleton width="70%" height={16} />
                </div>
              </div>
            ))
          : filteredFlights.map((flight) => (
              <TravelCard
                key={flight.plane_id}
                travel={mapFlightToTravelCard(flight)}
              />
            ))}
      </div>

      {!loading && !showSkeleton && pagination && pagination.totalPages > 1 && (
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

          {Array.from({ length: pagination.totalPages }).map((_, index) => (
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
            disabled={currentPage === pagination.totalPages}
            className={`p-2 rounded-lg ${
              currentPage === pagination.totalPages
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
