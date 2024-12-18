import ProductLogo from '../../../../public/images/quickfly-vertical.png';
import BannerFlower from '../../../../public/images/bannerFlower.png';

const AuthBanner = () => {
  return (
    <div className="w-full ">
      <div className="grid h-full bg-gradient-to-t from-[#FFE9CA00] via-[#FFE9CA00] to-[#DEC9FF] bg-[length:100%_300%] grid-rows-2">
        <div className="flex ml-[10%] mt-auto">
          <img src={ProductLogo} alt="Banner Logo" className="w-[264px]" />
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
