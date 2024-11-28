import React from 'react';
import SoldoutTicketImage from '../../../public/images/tikethabis.png';

const SoldoutTicket = () => {
  return (
    <>
      <div className="pt-20 flex flex-col items-center justify-center ">
        <div className="max-w-2xl w-full space-y-8">
          {/* NotFound Image */}
          <div className="flex justify-center">
            <img
              src={SoldoutTicketImage}
              alt="Sold out Image"
              className="w-86 h-86 object-contain"
            />
          </div>

          <div className="text-center">
            <p className="">Maaf, Tiket terjual habis!</p>
            <p className="text-[#7126B5]">Coba cari perjalanan lainnya!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoldoutTicket;
