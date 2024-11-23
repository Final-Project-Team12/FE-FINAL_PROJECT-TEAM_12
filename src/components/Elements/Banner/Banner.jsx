import BannerDestination from '../../../../public/images/destination.jpeg';

const Banner = () => {
  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="h-[200px] md:h-[300px] overflow-hidden rounded-3xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/90 to-transparent z-10" />
        <img
          src={BannerDestination}
          alt="Bangkok Temple Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="h-full flex items-center px-4 md:px-8">
            <div className="max-w-md md:max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold italic mb-2 md:mb-4">
                Diskon Hari ini
              </h1>
              <span className="text-5xl md:text-7xl font-bold text-purple-600">
                85%!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
