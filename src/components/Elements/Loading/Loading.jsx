import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  return (
    <div className="w-[180px] sm:w-[200px] md:w-[220px] mx-auto">
      <DotLottieReact
        src="https://lottie.host/782ffe36-16a6-44f3-a7ea-e2202e74cdfa/g0SWWPUyYD.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Loading;
