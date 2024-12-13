import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Loader } from 'lucide-react';
import { useFlightContext } from '../../../context/FlightContext';

const CitySelectionModal = ({ isOpen, onClose, onSelect, title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [recentCities, setRecentCities] = useState([]);
  const { flights, loading, error, fetchFlights } = useFlightContext();

  const processAirportsData = useCallback((flightsData) => {
    if (!flightsData?.outbound_flights) return [];

    const uniqueAirports = new Map();

    flightsData.outbound_flights.forEach((flight) => {
      const { origin_airport, destination_airport } = flight;

      if (!uniqueAirports.has(origin_airport.airport_id)) {
        uniqueAirports.set(origin_airport.airport_id, {
          id: origin_airport.airport_id,
          name: origin_airport.name,
          code: origin_airport.airport_code,
          continent: origin_airport.continent.name,
        });
      }

      if (!uniqueAirports.has(destination_airport.airport_id)) {
        uniqueAirports.set(destination_airport.airport_id, {
          id: destination_airport.airport_id,
          name: destination_airport.name,
          code: destination_airport.airport_code,
          continent: destination_airport.continent.name,
        });
      }
    });

    return Array.from(uniqueAirports.values());
  }, []);

  const fetchAirportsData = useCallback(async () => {
    try {
      const response = await fetchFlights(1, 100);
      if (response?.data) {
        const airportsList = processAirportsData(response.data);
        setAirports(airportsList);
      }
    } catch (err) {
      console.error('Error fetching airports:', err);
    }
  }, [fetchFlights, processAirportsData]);

  useEffect(() => {
    if (isOpen) {
      fetchAirportsData();
      const savedRecentCities = localStorage.getItem('recentCities');
      if (savedRecentCities) {
        setRecentCities(JSON.parse(savedRecentCities));
      }
    }
  }, [isOpen, fetchAirportsData]);

  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = airports.filter(
        (airport) =>
          airport.name.toLowerCase().includes(lowercaseQuery) ||
          airport.code.toLowerCase().includes(lowercaseQuery) ||
          airport.continent.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredAirports(filtered);
    } else {
      setFilteredAirports([]);
    }
  }, [searchQuery, airports]);

  const handleSelection = (airport) => {
    const selection = `${airport.name} (${airport.code})`;

    const updatedRecentCities = [
      selection,
      ...recentCities.filter((city) => city !== selection).slice(0, 4),
    ];
    setRecentCities(updatedRecentCities);
    localStorage.setItem('recentCities', JSON.stringify(updatedRecentCities));

    onSelect(selection);
    onClose();
  };

  const clearRecentCities = () => {
    setRecentCities([]);
    localStorage.removeItem('recentCities');
  };

  const removeFromRecentCities = (cityToRemove) => {
    const updatedRecentCities = recentCities.filter(
      (city) => city !== cityToRemove
    );
    setRecentCities(updatedRecentCities);
    localStorage.setItem('recentCities', JSON.stringify(updatedRecentCities));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden relative transform transition-all duration-300 ease-out max-h-[80vh] flex flex-col">
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 flex items-center border rounded-lg p-2">
              <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search city, airport code, or continent"
                className="ml-2 flex-1 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <button type="button" onClick={onClose}>
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4 p-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {searchQuery && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4">Search Results</h3>
              <div className="space-y-2">
                {loading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                ) : filteredAirports.length > 0 ? (
                  filteredAirports.map((airport) => (
                    <div
                      key={airport.id}
                      onClick={() => handleSelection(airport)}
                      className="flex flex-col p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <span className="font-medium">
                        {airport.name} ({airport.code})
                      </span>
                      <span className="text-sm text-gray-500">
                        {airport.continent}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">
                    No airports found matching your search
                  </div>
                )}
              </div>
            </div>
          )}

          {recentCities.length > 0 && !searchQuery && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Recent Searches</h3>
                <button
                  className="text-red-500 text-sm hover:text-red-600"
                  onClick={clearRecentCities}
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {recentCities.map((city) => (
                  <div
                    key={city}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => onSelect(city)}
                  >
                    <span>{city}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromRecentCities(city);
                      }}
                      className="hover:bg-gray-100 p-1 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitySelectionModal;
