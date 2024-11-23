import { Plane, Calendar, Users, ArrowLeftRight } from 'lucide-react';

const FlightSearch = () => {
  return (
    <div className="relative -mt-20 z-20">
      <div className="bg-white max-w-6xl mx-auto rounded-2xl shadow-lg">
        <div className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
            Pilih Jadwal Penerbangan spesial di{' '}
            <span className="text-purple-600">Tiketku!</span>
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center relative">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Plane size={16} className="rotate-45" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1 ml-2">From</div>
                  <input
                    type="text"
                    value="Jakarta (JKTA)"
                    className="w-full py-2 px-4 pl-10 border-b text-sm md:text-base focus:outline-none focus:border-purple-600"
                    readOnly
                  />
                </div>
              </div>

              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-black rounded-full p-1.5">
                  <ArrowLeftRight size={16} className="text-white" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Plane size={16} className="-rotate-45" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1 ml-2">To</div>
                  <input
                    type="text"
                    value="Melbourne (MLB)"
                    className="w-full py-2 px-4 pl-10 border-b text-sm md:text-base focus:outline-none focus:border-purple-600"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Date and Passengers Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1 ml-2">
                      Departure
                    </div>
                    <input
                      type="text"
                      value="1 Maret 2023"
                      className="w-full py-2 px-4 pl-10 border-b text-sm md:text-base focus:outline-none focus:border-purple-600"
                      readOnly
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar size={16} />
                  </div>
                  <div className="flex items-center">
                    <div>
                      <div className="text-gray-500 text-xs mb-1 ml-2">
                        Return
                      </div>
                      <input
                        type="text"
                        placeholder="Pilih Tanggal"
                        className="w-full py-2 px-4 pl-10 border-b text-sm md:text-base focus:outline-none focus:border-purple-600 placeholder-purple-600"
                      />
                    </div>
                    <div className="absolute right-0 top-0 mt-1 hidden md:block">
                      <div className="w-8 h-4 bg-purple-600 rounded-full relative">
                        <div className="absolute right-0 w-4 h-4 bg-white rounded-full border-2 border-purple-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1 ml-2">
                      Passengers
                    </div>
                    <input
                      type="text"
                      value="2 Penumpang"
                      className="w-full py-2 px-4 pl-10 border-b text-sm md:text-base focus:outline-none focus:border-purple-600"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <div className="text-gray-500 text-xs mb-1 ml-2">
                    Seat Class
                  </div>
                  <input
                    type="text"
                    value="Business"
                    className="w-full py-2 px-4 border-b text-sm md:text-base focus:outline-none focus:border-purple-600"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-purple-600 text-white py-4 md:py-3 rounded-b-2xl font-medium hover:bg-purple-700 transition-colors text-sm md:text-base">
          Cari Penerbangan
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;
