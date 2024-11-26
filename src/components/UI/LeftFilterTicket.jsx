import { useState } from 'react';

const LeftFilterTicket = () => {
  const [filters, setFilters] = useState({
    transit: false,
    fasilitas: false,
    harga: false,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [appliedPriceRange, setAppliedPriceRange] = useState(null);

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
      setAppliedPriceRange({ ...priceRange });
      setModalOpen(false);
    } else {
      alert('Masukkan rentang harga yang valid!');
    }
  };

  const ChevronIcon = ({ isOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
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
      <div className=" mb-[47px]">
        <div className="w-[260px] bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Filter</h3>

          {/* Transit */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleFilter('transit')}
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
                  <label htmlFor="direct" className="ml-2">
                    Langsung
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="1stop" />
                  <label htmlFor="1stop" className="ml-2">
                    1 Transit
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="2stop" />
                  <label htmlFor="2stop" className="ml-2">
                    2+ Transit
                  </label>
                </li>
              </ul>
            )}
          </div>
          <hr className="my-4" />

          {/* Fasilitas */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleFilter('fasilitas')}
              aria-expanded={filters.fasilitas}
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
                  <label htmlFor="wifi" className="ml-2">
                    Wi-Fi
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="meals" />
                  <label htmlFor="meals" className="ml-2">
                    Makanan
                  </label>
                </li>
              </ul>
            )}
          </div>
          <hr className="my-4" />

          {/* Harga */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <span className="font-medium">Harga</span>
              <span className="text-gray-500">
                <ChevronIcon isOpen={isModalOpen} />
              </span>
            </div>
            {appliedPriceRange && (
              <p className="mt-2 text-sm text-gray-700">
                Rp{appliedPriceRange.min} - Rp{appliedPriceRange.max}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Harga */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
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
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
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

export default LeftFilterTicket;
