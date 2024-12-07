import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heart, DollarSign } from 'lucide-react';
import {
  setActiveFilters,
  clearAllFilters,
} from '../../store/slices/flightFilterSlice';

const TicketFilterSidebar = () => {
  const dispatch = useDispatch();
  const { activeFilters } = useSelector((state) => state.flightFilter);

  const [filters, setFilters] = useState({
    fasilitas: false,
    harga: false,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedFacilities, setSelectedFacilities] = useState({
    wifi: false,
    meals: false,
    entertainment: false,
    power: false,
  });

  useEffect(() => {
    if (activeFilters.facilities) {
      setSelectedFacilities((prev) => ({
        ...prev,
        ...activeFilters.facilities.reduce(
          (acc, facility) => ({
            ...acc,
            [facility]: true,
          }),
          {}
        ),
      }));
    }

    if (activeFilters.minPrice && activeFilters.maxPrice) {
      setPriceRange({
        min: activeFilters.minPrice,
        max: activeFilters.maxPrice,
      });
    }
  }, [activeFilters]);

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const applyPriceFilter = () => {
    if (
      priceRange.min &&
      priceRange.max &&
      Number(priceRange.min) <= Number(priceRange.max)
    ) {
      dispatch(
        setActiveFilters({
          minPrice: Number(priceRange.min),
          maxPrice: Number(priceRange.max),
        })
      );
      setModalOpen(false);
    } else {
      alert('Masukkan rentang harga yang valid!');
    }
  };

  const handleFacilityChange = (facility) => {
    const newFacilities = {
      ...selectedFacilities,
      [facility]: !selectedFacilities[facility],
    };
    setSelectedFacilities(newFacilities);

    // Create array of selected facilities
    const selectedFacilitiesArray = Object.entries(newFacilities)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => key);

    // Update filters in Redux
    dispatch(setActiveFilters({ facilities: selectedFacilitiesArray }));
  };

  const handleResetFilters = () => {
    dispatch(clearAllFilters());
    setSelectedFacilities({
      wifi: false,
      meals: false,
      entertainment: false,
      power: false,
    });
    setPriceRange({ min: '', max: '' });
  };

  const handlePriceReset = () => {
    setPriceRange({ min: '', max: '' });
    dispatch(setActiveFilters({ minPrice: '', maxPrice: '' }));
  };

  const ChevronIcon = ({ isOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={
          isOpen ? 'M19.5 8.25l-7.5 7.5-7.5-7.5' : 'M8.25 19.5l7.5-7.5-7.5-7.5'
        }
      />
    </svg>
  );

  return (
    <>
      <div className="mb-[47px]">
        <div className="w-[260px] bg-white rounded-2xl border border-slate-200 shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Filter</h3>
            <button
              onClick={handleResetFilters}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Reset
            </button>
          </div>

          {/* Fasilitas */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleFilter('fasilitas')}
              aria-expanded={filters.fasilitas}
            >
              <div className="flex items-center gap-2">
                <Heart size={24} className="text-slate-500" />
                <span className="font-normal text-left">Fasilitas</span>
              </div>
              <span className="text-gray-500">
                <ChevronIcon isOpen={filters.fasilitas} />
              </span>
            </div>
            {filters.fasilitas && (
              <ul className="ml-8 mt-2 text-sm text-gray-700">
                <li className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="wifi"
                    checked={selectedFacilities.wifi}
                    onChange={() => handleFacilityChange('wifi')}
                    className="rounded text-purple-600"
                  />
                  <label htmlFor="wifi" className="ml-2 cursor-pointer">
                    Wi-Fi
                  </label>
                </li>
                <li className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="meals"
                    checked={selectedFacilities.meals}
                    onChange={() => handleFacilityChange('meals')}
                    className="rounded text-purple-600"
                  />
                  <label htmlFor="meals" className="ml-2 cursor-pointer">
                    Makanan
                  </label>
                </li>
                <li className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="entertainment"
                    checked={selectedFacilities.entertainment}
                    onChange={() => handleFacilityChange('entertainment')}
                    className="rounded text-purple-600"
                  />
                  <label
                    htmlFor="entertainment"
                    className="ml-2 cursor-pointer"
                  >
                    Hiburan
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    id="power"
                    checked={selectedFacilities.power}
                    onChange={() => handleFacilityChange('power')}
                    className="rounded text-purple-600"
                  />
                  <label htmlFor="power" className="ml-2 cursor-pointer">
                    Stop Kontak
                  </label>
                </li>
              </ul>
            )}
          </div>
          <hr className="my-4 bg-slate-400" />

          {/* Harga */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <div className="flex items-center gap-2">
                <DollarSign size={24} className="text-slate-500" />
                <span className="font-normal text-left">Harga</span>
              </div>
              <span className="text-gray-500">
                <ChevronIcon isOpen={isModalOpen} />
              </span>
            </div>
            {activeFilters.minPrice && activeFilters.maxPrice && (
              <div className="mt-2 ml-8 text-sm text-gray-700 flex items-center gap-2">
                <p>
                  Rp{Number(activeFilters.minPrice).toLocaleString()} - Rp
                  {Number(activeFilters.maxPrice).toLocaleString()}
                </p>
                <button
                  onClick={handlePriceReset}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Reset rentang harga"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Harga */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h4 className="text-lg font-semibold text-purple-600 mb-4">
              Masukkan Rentang Harga
            </h4>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="min-price" className="text-sm text-gray-700">
                  Harga Minimum
                </label>
                <input
                  type="number"
                  id="min-price"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="Masukkan harga minimum"
                />
              </div>
              <div>
                <label htmlFor="max-price" className="text-sm text-gray-700">
                  Harga Maksimum
                </label>
                <input
                  type="number"
                  id="max-price"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="Masukkan harga maksimum"
                />
              </div>
              <button
                onClick={applyPriceFilter}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketFilterSidebar;
