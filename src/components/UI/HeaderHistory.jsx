import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SortTicket from './SortTicket';

const HeaderHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b py-2 -mt-2 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
      <div className="ml-[260px] mr-[212px] mb-5">
        <h2 className="text-xl font-bold my-[24px]">Riwayat Pemesanan</h2>
        <div className="flex gap-3 mx-4">
          <div
            className="w-[700px] h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center "
            onClick={() => navigate('/')}
          >
            <img
              src="../../public/icons/fi_arrow-left.svg"
              alt=""
              className="w-6 h-6 ml-4 hover:scale-125 hover: transition-all duration-10 text-white"
            />
            <div className="ml-3 text-white">Beranda</div>
          </div>
          <div className="w-[110px] h-[50px]">
            <SortTicket />
          </div>
          <div className="w-[110px]">nanti dulu </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHistory;
