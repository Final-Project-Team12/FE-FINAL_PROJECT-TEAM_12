import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarFilter from '../Elements/Filter/CalendarFilter';
import SearchButton from '../Elements/Buttons/SearchButton';
import iconArrowLeft from '../../../public/icons/fi_arrow-left.svg';

const HeaderHistory = ({ onDateRangeChange }) => {
  const navigate = useNavigate();
  const handleDateRangeChange = (startDate, endDate) => {
    onDateRangeChange(startDate, endDate);
  };
  return (
    <div className="border-b py-2 -mt-2 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
      <div className="ml-4 mr-3 sm:ml-[64px] sm:mr-[48px] md:ml-[128px] md:mr-[96px] xl:ml-[260px] xl:mr-[212px] mb-5">
        <h2 className="text-xl font-bold my-[24px]">Riwayat Pemesanan</h2>
        <div className="md:flex md:flex-col md:mx-3 lg:flex lg:flex-col xl:flex xl:flex-row xl:mx-4 gap-3">
          <div
            className="xl:w-[700px] h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src={iconArrowLeft}
              alt=""
              className="w-6 h-6 ml-4 hover:scale-125 hover: transition-all duration-10 text-white"
            />
            <div className="ml-3 text-white">Beranda</div>
          </div>
          <div className="flex justify-between gap-3 p-2 sm:flex sm:justify-between md:flex md:justify-between">
            <div className=" h-[50px]">
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

export default HeaderHistory;
