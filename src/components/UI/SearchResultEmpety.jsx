import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SearchResultEmpty = () => {
  return (
    <>
      <div className="text-center ">
        <div>
          <DotLottieReact
            src="https://lottie.host/9962d56e-26d1-4837-bf4f-2df70cd11a6c/BbHhsJlyXu.lottie "
            loop
            autoplay
          />
        </div>
        <p className="">Maaf, pencarian Anda tidak ditemukan</p>
        <p className="text-[#7126B5]">Coba cari perjalanan lainnya!</p>
      </div>
    </>
  );
};

export default SearchResultEmpty;
