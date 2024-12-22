import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingHistory = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center py-8 px-4">
      <div className="mb-[47px] w-full max-w-2xl">
        <p className="text-gray-500 text-sm sm:text-base md:text-lg">
          Mencari riwayat pesanan...
        </p>
        <div className="w-full sm:w-[260px] md:w-[300px] mx-auto mt-4">
          <DotLottieReact
            src="https://lottie.host/782ffe36-16a6-44f3-a7ea-e2202e74cdfa/g0SWWPUyYD.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingHistory;
