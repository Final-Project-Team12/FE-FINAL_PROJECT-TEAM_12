import React, { useState, useEffect } from 'react';
import { Search, X, Loader } from 'lucide-react';

const availableCities = [
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Medan',
  'Bali',
  'Makassar',
  'Palembang',
  'Semarang',
  'Malang',
];

const CitySelectionModal = ({ isOpen, onClose, onSelect, title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentCities, setRecentCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load recent cities from localStorage when component mounts
    const savedRecentCities = localStorage.getItem('recentCities');
    if (savedRecentCities) {
      setRecentCities(JSON.parse(savedRecentCities));
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      // Simulate API delay
      const timeoutId = setTimeout(() => {
        const filteredCities = availableCities.filter((city) =>
          city.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredCities);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelection = (city) => {
    // Update recent cities
    const updatedRecentCities = [
      city,
      ...recentCities.filter((c) => c !== city).slice(0, 4),
    ];
    setRecentCities(updatedRecentCities);
    localStorage.setItem('recentCities', JSON.stringify(updatedRecentCities));

    onSelect(city);
    onClose();
  };

  const handleManualEntry = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSelection(searchQuery.trim());
    }
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
          <form onSubmit={handleManualEntry}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 flex items-center border rounded-lg p-2">
                <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Masukkan Kota atau Negara"
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
          </form>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4">Hasil Pencarian</h3>
              <div className="space-y-2">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((city) => (
                    <div
                      key={city}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleSelection(city)}
                    >
                      <span>{city}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">
                    Tidak ada hasil. Tekan Enter untuk menambahkan "
                    {searchQuery}" sebagai kota baru.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentCities.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Pencarian terkini</h3>
                <button
                  className="text-red-500 text-sm hover:text-red-600"
                  onClick={clearRecentCities}
                >
                  Hapus Semua
                </button>
              </div>
              <div className="space-y-2">
                {recentCities.map((city) => (
                  <div
                    key={city}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleSelection(city)}
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
