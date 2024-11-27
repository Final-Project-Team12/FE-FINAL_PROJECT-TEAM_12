import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingTicket = () => {
  return (
    <>
      <div className=" justify-center items-center text-center">
        <div className=" mb-[47px] ml-[180px]">
          <div className="max-w-2xl] ">
            <p className="text-gray-500">Mencari penerbangan terbaik...</p>
            <div className="w-[260px]">
              <DotLottieReact
                src="https://lottie.host/782ffe36-16a6-44f3-a7ea-e2202e74cdfa/g0SWWPUyYD.lottie"
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
