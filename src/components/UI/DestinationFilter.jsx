import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import TravelCard from './TravelCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFlightContext } from '../../context/FlightContext';

const ITEMS_PER_PAGE = 5;
const CACHE_DURATION = 5 * 60 * 1000;

const DestinationFilter = () => {
  const { flights, loading, error, fetchFlights } = useFlightContext();
  const [activeContinent, setActiveContinent] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [continents, setContinents] = useState([{ id: 'all', name: 'Semua' }]);
  const [totalPages, setTotalPages] = useState(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFlights(1, 100);
      } catch (error) {
        console.error('Error fetching all flights:', error);
      }
    };

    fetchData();
    const interval = setInterval(() => fetchData(), CACHE_DURATION / 2);
    return () => clearInterval(interval);
  }, [fetchFlights]);

  useEffect(() => {
    if (flights?.outbound_flights) {
      const uniqueContinents = new Set();
      flights.outbound_flights.forEach((flight) => {
        if (flight.destination_airport?.continent) {
          uniqueContinents.add(
            JSON.stringify({
              id: flight.destination_airport.continent.continent_id,
              name: flight.destination_airport.continent.name,
            })
          );
        }
      });

      const continentArray = Array.from(uniqueContinents)
        .map((str) => JSON.parse(str))
        .sort((a, b) => a.name.localeCompare(b.name));

      setContinents([{ id: 'all', name: 'Semua' }, ...continentArray]);
    }
  }, [flights]);

  useEffect(() => {
    let filtered = flights?.outbound_flights || [];

    if (activeContinent !== 'all') {
      filtered = filtered.filter(
        (flight) =>
          flight.destination_airport?.continent?.continent_id.toString() ===
          activeContinent.toString()
      );
    }

    setFilteredFlights(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [activeContinent, flights]);

  const getCurrentPageItems = useCallback(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredFlights.slice(startIndex, endIndex);
  }, [currentPage, filteredFlights]);

  const getVisiblePages = useCallback(() => {
    const maxVisible = windowWidth < 640 ? 3 : 5;
    const halfVisible = Math.floor(maxVisible / 2);
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, windowWidth]);

  return (
    <div className="mt-6 sm:mt-8 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Destinasi Favorit
      </h2>

      <div className="overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 min-w-min">
          {continents.map((continent) => (
            <button
              key={continent.id}
              onClick={() => setActiveContinent(continent.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeContinent === continent.id
                  ? 'bg-[#7126B5] text-white shadow-md'
                  : 'bg-purple-100 text-gray-700 hover:bg-purple-200'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{continent.name}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center my-4 p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mt-4 sm:mt-6">
        {loading ? (
          Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden p-3"
            >
              <Skeleton height={150} className="rounded-lg" />
              <div className="mt-3 space-y-2">
                <Skeleton width="70%" height={20} />
                <Skeleton width="50%" height={16} />
                <Skeleton width="60%" height={16} />
              </div>
            </div>
          ))
        ) : getCurrentPageItems().length > 0 ? (
          getCurrentPageItems().map((flight) => (
            <TravelCard key={flight.plane_id} travel={flight} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No flights found for the selected continent.
          </div>
        )}
      </div>

      {filteredFlights.length > ITEMS_PER_PAGE && (
        <div className="mt-6 mb-8">
          <div className="flex justify-center items-center">
            <div className="inline-flex items-center bg-white rounded-lg border border-gray-300">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center h-8 px-2 sm:px-3 rounded-l-lg border-r border-gray-300
                  ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-purple-100'
                  }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-1 text-sm font-medium">
                  Prev
                </span>
              </button>

              <div className="flex items-center">
                {getVisiblePages().map((page, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === 'number' && setCurrentPage(page)
                    }
                    disabled={page === '...'}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors
                      ${
                        page === currentPage
                          ? 'bg-[#7126B5] text-white'
                          : page === '...'
                            ? 'text-gray-500 cursor-default'
                            : 'text-gray-700 hover:bg-purple-100'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`flex items-center h-8 px-2 sm:px-3 rounded-r-lg border-l border-gray-300
                  ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-purple-100'
                  }`}
              >
                <span className="hidden sm:inline mr-1 text-sm font-medium">
                  Next
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationFilter;
