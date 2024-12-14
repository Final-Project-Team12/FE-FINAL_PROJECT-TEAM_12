import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarFilter from '../Elements/Filter/CalendarFilter';
import SearchButton from '../Elements/Buttons/SearchButton';
import { ArrowLeft } from 'lucide-react';

const HeaderNotification = ({ onDateRangeChange, onSearchTextChange }) => {
  const navigate = useNavigate();

  const handleDateRangeChange = (startDate, endDate) => {
    onDateRangeChange(startDate, endDate);
  };

  const handleSearchTextChange = (e) => {
    onSearchTextChange(e.target.value);
  };

  return (
    <div className="border-b py-2 -mt-2 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
      <div className="ml-4 mr-3 sm:ml-[64px] sm:mr-[48px] md:ml-[20px] md:mr-[20px] lg:mr-[50px] lg:ml-[50px] xl:ml-[260px] xl:mr-[212px] mb-5">
        <h2 className="text-xl font-bold my-[24px]">Notifikasi</h2>
        <div className="md:flex md:flex-col md:mx-3 lg:flex lg:flex-col xl:flex xl:flex-row xl:mx-4 gap-3">
          <div
            className="xl:w-[700px] h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 text-white hover:scale-110 transition-transform duration-200" />
            <div className="ml-3 text-white">Beranda</div>
          </div>
          <div className="flex justify-between gap-3 p-2 sm:flex sm:justify-between md:flex md:justify-between">
            <div className="h-[50px]">
              <CalendarFilter onDateRangeChange={handleDateRangeChange} />
            </div>
            <div className="">
              <SearchButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNotification;