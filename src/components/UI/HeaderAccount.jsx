import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderAccount = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="border-b shadow-[0px_4px_10px_rgba(0,0,0,0.1)] pb-4 sm:pb-5">
      <div className="px-4 md:px-8 lg:ml-[260px] lg:mr-[212px] mt-6 sm:mt-[47px]">
        {/* Header Top Section */}
        <div className="flex items-center justify-between mb-4 sm:mb-[24px]">
          {/* Mobile Menu and Title */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <Menu size={24} className="text-gray-700" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold">Akun</h2>
          </div>
        </div>

        {/* Beranda Button Section */}
        <div className="flex gap-3">
          <div
            className="w-full h-[40px] sm:h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center hover:bg-purple-800 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 text-white hover:scale-110 transition-transform duration-200" />
            <span className="ml-2 sm:ml-3 text-sm sm:text-base text-white">
              Beranda
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAccount;
