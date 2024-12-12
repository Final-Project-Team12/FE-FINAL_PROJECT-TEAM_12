import { useNavigate } from 'react-router-dom';
import CalendarFilter from '../Elements/Filter/CalendarFilter';
import SearchButton from '../Elements/Buttons/SearchButton';
import { ArrowLeft } from 'lucide-react';

const HeaderHistory = ({ onDateRangeChange }) => {
  const navigate = useNavigate();
  const handleDateRangeChange = (startDate, endDate) => {
    onDateRangeChange(startDate, endDate);
  };
  return (
    <div className="border-b py-2 -mt-2 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
      <div className="ml-[260px] mr-[212px] mb-5">
        <h2 className="text-xl font-bold my-[24px]">Riwayat Pemesanan</h2>
        <div className="flex gap-3 mx-4">
          <div
            className="w-[700px] h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center hover:bg-purple-800 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 text-white hover:scale-110 transition-transform duration-200" />
            <div className="ml-3 text-white">Beranda</div>
          </div>
          <div className="w-[110px] h-[50px]">
            <CalendarFilter onDateRangeChange={handleDateRangeChange} />
          </div>
          <div className="w-[110px]">
            <SearchButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHistory;
