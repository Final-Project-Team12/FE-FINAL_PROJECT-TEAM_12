import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heart, DollarSign } from 'lucide-react';
import {
  setActiveFilters,
  clearAllFilters,
  fetchFilteredFlights,
} from '../../store/slices/flightFilterSlice';
import Swal from 'sweetalert2';

const TicketFilterSidebar = () => {
  const dispatch = useDispatch();
  const { activeFilters } = useSelector((state) => state.flightFilter);
  const {
    fromCity,
    toCity,
    departureDate,
    returnDate,
    selectedSeatClass,
    passengerCounts,
    isRoundTrip,
  } = useSelector((state) => state.flightSearch);

  const [filters, setFilters] = useState({
    fasilitas: false,
    harga: false,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedFacilities, setSelectedFacilities] = useState({
    wifi: false,
    meals: false,
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
        min: formatPrice(activeFilters.minPrice.toString()),
        max: formatPrice(activeFilters.maxPrice.toString()),
      });
    }
  }, [activeFilters]);

  const formatApiDate = (date) => {
    if (!date) return '';
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return '';

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const applyFilters = (newFilters) => {
    dispatch(setActiveFilters(newFilters));

    const searchPayload = {
      from: fromCity,
      to: toCity,
      departureDate: formatApiDate(departureDate),
      seatClass: selectedSeatClass,
      passengerAdult: passengerCounts.adult || 0,
      passengerChild: passengerCounts.child || 0,
      passengerInfant: passengerCounts.infant || 0,
      ...(isRoundTrip &&
        returnDate && {
          returnDate: formatApiDate(returnDate),
        }),
    };

    dispatch(
      fetchFilteredFlights({
        page: 1,
        filters: newFilters,
        searchParams: searchPayload,
      })
    );
  };

  const handleFacilityChange = (facility) => {
    const newFacilities = {
      ...selectedFacilities,
      [facility]: !selectedFacilities[facility],
    };
    setSelectedFacilities(newFacilities);

    const selectedFacilitiesArray = Object.entries(newFacilities)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => key);

    const newFilters = {
      ...activeFilters,
      facilities: selectedFacilitiesArray,
    };

    applyFilters(newFilters);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatPrice(value);
    setPriceRange((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = Number(numericValue).toLocaleString('id-ID');
    return `IDR ${formattedValue}`;
  };

  const parsePrice = (formattedPrice) => {
    return Number(formattedPrice.replace(/\D/g, ''));
  };

  const applyPriceFilter = () => {
    const minPrice = parsePrice(priceRange.min);
    const maxPrice = parsePrice(priceRange.max);

    if (minPrice <= maxPrice) {
      const newFilters = {
        ...activeFilters,
        minPrice,
        maxPrice,
      };
      applyFilters(newFilters);
      setModalOpen(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Rentang Harga Tidak Valid',
        text: 'Masukkan rentang harga yang valid!',
      });
    }
  };

  const handleResetFilters = () => {
    dispatch(clearAllFilters());
    setSelectedFacilities({
      wifi: false,
      meals: false,
      power: false,
    });
    setPriceRange({ min: '', max: '' });

    const searchPayload = {
      from: fromCity,
      to: toCity,
      departureDate: formatApiDate(departureDate),
      seatClass: selectedSeatClass,
      passengerAdult: passengerCounts.adult || 0,
      passengerChild: passengerCounts.child || 0,
      passengerInfant: passengerCounts.infant || 0,
      ...(isRoundTrip &&
        returnDate && {
          returnDate: formatApiDate(returnDate),
        }),
    };

    dispatch(
      fetchFilteredFlights({
        page: 1,
        filters: {},
        searchParams: searchPayload,
      })
    );
  };

  const handlePriceReset = () => {
    setPriceRange({ min: '', max: '' });
    const newFilters = {
      ...activeFilters,
      minPrice: '',
      maxPrice: '',
    };
    applyFilters(newFilters);
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
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
      <div className="mb-[20px]">
        <div className="w-full md:w-[260px] bg-white rounded-2xl border border-slate-200 shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs md:text-[16px] font-medium">Filter</h3>
            <button
              onClick={handleResetFilters}
              className="text-xs md:text-sm text-purple-600 hover:text-purple-700"
            >
              Reset
            </button>
          </div>

          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleFilter('fasilitas')}
              aria-expanded={filters.fasilitas}
            >
              <div className="flex items-center gap-2">
                <Heart size={24} className="text-slate-500" />
                <span className="text-left text-xs md:text-[16px]">
                  Fasilitas
                </span>
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

          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <div className="flex items-center gap-2">
                <DollarSign size={24} className="text-slate-500" />
                <span className="text-xs md:text-[16px] text-left">Harga</span>
              </div>
              <span className="text-gray-500">
                <ChevronIcon isOpen={isModalOpen} />
              </span>
            </div>
            {activeFilters.minPrice && activeFilters.maxPrice && (
              <div className="mt-2 ml-8 text-sm text-gray-700 flex items-center gap-2">
                <p>
                  {formatPrice(activeFilters.minPrice.toString())} -{' '}
                  {formatPrice(activeFilters.maxPrice.toString())}
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
                  type="text"
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
                  type="text"
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
