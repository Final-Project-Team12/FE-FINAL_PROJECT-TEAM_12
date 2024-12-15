import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SearchButtonNotification from '../Elements/Buttons/SearchButtonNotification';
import CalendarFilter from '../Elements/Filter/CalendarFilter';

const HeaderNotification = ({ onSearch, onDateRangeChange }) => {
  const navigate = useNavigate();
  const handleDateRangeChange = (startDate, endDate) => {
    onDateRangeChange(startDate, endDate);
  };

  return (
    <div className="border-b py-2 -mt-2 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
      <div className="ml-4 mr-3 sm:ml-[64px] sm:mr-[48px] md:ml-[20px] md:mr-[20px] lg:mr-[50px] lg:ml-[50px] xl:ml-[260px] xl:mr-[212px] mb-5">
        <h2 className="text-xl font-bold my-[24px]">Notifikasi</h2>
        <div className=" md:mx-3 flex flex-row xl:mx-4 gap-3 items-center">
          <div
            className="w-[250px] sm:w-[600px] xl:w-[700px] h-[50px] rounded-[12px] bg-[#A06ECE] hover:bg-purple-600 flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 text-white hover:scale-110 transition-transform duration-200" />
            <div className="ml-3 text-white">Beranda</div>
          </div>
          <div className="flex justify-between gap-3 p-2 sm:flex sm:justify-between md:flex md:justify-between">
            <div className=" h-[50px]">
              <CalendarFilter
                onDateRangeChange={(startDate, endDate) => {
                  console.log('Selected Date Range:', startDate, endDate);
                  onDateRangeChange(startDate, endDate);
                }}
              />
            </div>
            <div className="w-10 ml-1">
              <SearchButtonNotification onSearch={onSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNotification;