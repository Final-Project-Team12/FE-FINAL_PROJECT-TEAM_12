import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingTicket = () => {
  return (
    <>
      <div className=" justify-center items-center">
        <div className=" mb-[47px] ml-[180px]">
          <div className="max-w-2xl] ">
            <p className="">Mencari penerbangan terbaik...</p>
            <div className="w-[260px]">
              <DotLottieReact
                src="https://lottie.host/a023d0bd-f53e-486d-891b-80c96d2f4a07/ukDhX7wzwO.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingTicket;
