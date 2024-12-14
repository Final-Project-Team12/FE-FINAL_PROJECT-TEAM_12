import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import iconSearch from '../../../../public/icons/search.svg';

const SearchButtonNotification = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchHistory([searchQuery, ...searchHistory]);
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Real-time search
  };

  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onSearch(''); // Clear search when closing
  };

  const deleteAllHistory = () => {
    setSearchHistory([]);
  };

  const deleteSearchItem = (index) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsSearchOpen(true)}
        className="h-[50px] rounded-[12px] flex items-center justify-center hover:opacity-80"
      >
        <img src={iconSearch} alt="Search" className="w-6 h-6" />
      </button>

      {isSearchOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A06ECE]"
              />
            </form>
            <button
              onClick={handleClose}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Recent Searches
              </span>
              {searchHistory.length > 0 && (
                <button
                  onClick={deleteAllHistory}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Delete All
                </button>
              )}
            </div>

            <div className="space-y-2">
              {searchHistory.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded"
                >
                  <span 
                    className="text-sm text-gray-600 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(search);
                      onSearch(search);
                    }}
                  >
                    {search}
                  </span>
                  <button
                    onClick={() => deleteSearchItem(index)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchButtonNotification;