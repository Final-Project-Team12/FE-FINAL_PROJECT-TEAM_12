import { useState } from "react";

const LeftFilterTicket = () => {
  const [filters, setFilters] = useState({
    transit: false,
    fasilitas: false,
    harga: false,
  });
  
  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  return (
    <>
      {/* Transit */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleFilter("transit")}
          aria-expanded={filters.transit}
        >
          <span className="font-medium">Transit</span>
          <span className="text-gray-500">
            <ChevronIcon isOpen={filters.transit} />
          </span>
        </div>
        {filters.transit && (
          <ul className="ml-4 mt-2 text-sm text-gray-700">
            <li>
              <input type="checkbox" id="direct" />
              <label htmlFor="direct" className="ml-2">Langsung</label>
            </li>
            <li>
              <input type="checkbox" id="1stop" />
              <label htmlFor="1stop" className="ml-2">1 Transit</label>
            </li>
          </ul>
        )}
      </div>
      {/* Fasilitas */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleFilter("fasilitas")}
        >
          <span className="font-medium">Fasilitas</span>
          <span className="text-gray-500">
            <ChevronIcon isOpen={filters.fasilitas} />
          </span>
        </div>
        {filters.fasilitas && (
          <ul className="ml-4 mt-2 text-sm text-gray-700">
            <li>
              <input type="checkbox" id="wifi" />
              <label htmlFor="wifi" className="ml-2">Wi-Fi</label>
            </li>
          </ul>
        )}
      </div>
    </>
  );
  
};

export default LeftFilterTicket;
