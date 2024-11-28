import { Search } from 'lucide-react';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import ProductLogo from '../../../public/icons/logo.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.1)] z-30 overflow-x-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="text-[#7126B5] font-bold text-xl flex items-center pl-2 sm:pl-4 md:pl-8">
              <img src={ProductLogo} alt="" onClick={handleLogoClick} />
            </div>

            <div className="hidden md:block relative w-[300px] lg:w-[450px]">
              <input
                type="text"
                placeholder="Cari di sini ..."
                className="w-full bg-gray-100 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="pr-2 sm:pr-4 md:pr-8">
            <button className="bg-[#7126B5] text-white px-4 md:px-6 py-2 rounded-lg flex items-center text-sm md:text-base">
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
