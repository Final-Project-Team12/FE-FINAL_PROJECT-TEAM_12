import { Search, Plane } from 'lucide-react';
import { FaArrowRightToBracket } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-lg z-30 overflow-x-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section with logo and search */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Logo with responsive padding */}
            <div className="text-purple-600 font-bold text-xl flex items-center pl-2 sm:pl-4 md:pl-8">
              <Plane className="mr-2" size={24} />
              <span className="text-lg md:text-xl">Tiketku</span>
            </div>

            {/* Search bar - hidden on mobile, width adjusts for tablet/desktop */}
            <div className="hidden md:block relative w-[300px] lg:w-[450px]">
              <input
                type="text"
                placeholder="Cari di sini ..."
                className="w-full bg-gray-100 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Login button with responsive padding */}
          <div className="pr-2 sm:pr-4 md:pr-8">
            <button className="bg-purple-600 text-white px-4 md:px-6 py-2 rounded-lg flex items-center text-sm md:text-base">
              <FaArrowRightToBracket className="mr-2" size={16} />
              Masuk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
