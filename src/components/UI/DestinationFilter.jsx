import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TravelCard from './TravelCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFlights } from '../../hooks/useFlight';

const ITEMS_PER_PAGE = 5;

const DestinationFilter = () => {
  const [activeContinent, setActiveContinent] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [continents, setContinents] = useState([{ id: 'all', name: 'Semua' }]);
  const { flights, loading, error, pagination, fetchFlights } = useFlights();
  const [paginatedFlights, setPaginatedFlights] = useState([]);
  const [lastKnownCount, setLastKnownCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    if (flights?.outbound_flights) {
      const uniqueContinents = new Set();

      flights.outbound_flights.forEach((flight) => {
        if (flight.origin_airport?.continent) {
          uniqueContinents.add(
            JSON.stringify({
              id: flight.origin_airport.continent.continent_id,
              name: flight.origin_airport.continent.name,
            })
          );
        }
        if (flight.destination_airport?.continent) {
          uniqueContinents.add(
            JSON.stringify({
              id: flight.destination_airport.continent.continent_id,
              name: flight.destination_airport.continent.name,
            })
          );
        }
      });

      const continentArray = Array.from(uniqueContinents).map((str) =>
        JSON.parse(str)
      );

      const sortedContinents = continentArray.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setContinents([{ id: 'all', name: 'Semua' }, ...sortedContinents]);
    }
  }, [flights]);

  useEffect(() => {
    fetchFlights(currentPage, ITEMS_PER_PAGE);
  }, [currentPage, fetchFlights]);

  useEffect(() => {
    if (flights && flights.outbound_flights) {
      const filtered = flights.outbound_flights.filter((flight) => {
        if (activeContinent === 'all') return true;

        return (
          flight.destination_airport.continent.continent_id.toString() ===
          activeContinent.toString()
        );
      });

      setPaginatedFlights(filtered);

      if (!loading && filtered.length > 0) {
        setLastKnownCount(filtered.length);
      }
    }
  }, [flights, activeContinent, loading]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (pagination?.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => {
    if (
      !pagination ||
      pagination.totalPages <= 1 ||
      (activeContinent !== 'all' && paginatedFlights.length <= ITEMS_PER_PAGE)
    ) {
      return null;
    }

    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-6 mb-4">
        <button
          onClick={handlePrevPage}
          disabled={!pagination.hasPreviousPage}
          className={`p-2 rounded-lg ${
            !pagination.hasPreviousPage
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[#7126B5] hover:bg-purple-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === number
                ? 'bg-[#7126B5] text-white'
                : 'text-gray-600 hover:bg-purple-100'
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={!pagination.hasNextPage}
          className={`p-2 rounded-lg ${
            !pagination.hasNextPage
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[#7126B5] hover:bg-purple-100'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
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

      {error && <div className="text-red-500 text-center my-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mt-4 sm:mt-6 py-3 sm:py-4">
        {loading
          ? Array.from({ length: lastKnownCount }).map((_, index) => (
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
          : paginatedFlights.map((flight) => (
              <TravelCard key={flight.plane_id} travel={flight} />
            ))}
      </div>

      {!loading && renderPagination()}
    </div>
  );
};

export default DestinationFilter;
