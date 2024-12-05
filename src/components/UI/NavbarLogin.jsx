import { Bell, List, Search, User } from 'lucide-react';
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
          </div>

          <div className='flex'>
            <div className="pr-2 sm:pr-4 md:pr-6">
              <List size={20} />
            </div>
            <div className="pr-2 sm:pr-4 md:pr-6">
              <Bell size={20} />
            </div>
            <div className="pr-2 sm:pr-4 md:pr-6">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
