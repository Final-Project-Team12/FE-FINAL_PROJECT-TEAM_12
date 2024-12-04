import BannerLogo from '../../../../public/icons/bannerLogo.svg';
import BannerFlower from '../../../../public/images/bannerFlower.png';

const AuthBanner = () => {
  return (
    <div className="relative w-1/2 h-screen">
      <div className="grid h-full bg-gradient-to-t from-[#FFE9CA00] via-[#FFE9CA00] to-[#DEC9FF] bg-[length:100%_300%] grid-rows-2">
        <div className="flex ml-[10%] mt-auto">
          <img src={BannerLogo} alt="Banner Logo" />
        </div>

        <div>
          <img
            src={BannerFlower}
            alt="Banner Flower"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;