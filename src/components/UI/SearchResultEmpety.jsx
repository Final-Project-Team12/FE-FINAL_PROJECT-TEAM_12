import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SearchResultEmpty = () => {
  return (
    <>
      <div className=" justify-center items-center text-center">
        <div className=" mb-[47px] ml-[180px]">
          <div className="max-w-2xl] ">
            <div className="w-[440px]">
              <DotLottieReact
                src="https://lottie.host/c0f8fda0-009f-4f6d-9a1b-d9e3e738f2f3/bd6m5wAwBF.lottie"
                loop
                autoplay
              />
            </div>
            <p className="">Maaf, pencarian Anda tidak ditemukan</p>
            <p className="text-[#7126B5]">Coba cari perjalanan lainnya!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultEmpty;
