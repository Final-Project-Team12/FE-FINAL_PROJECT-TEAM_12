import React from 'react';
import { Plane, Calendar, Users, ArrowLeftRight } from 'lucide-react';

const FlightSearch = () => {
  return (
    <div className="relative z-20 max-w-6xl mx-auto pt-12 px-4">
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">
            Pilih Jadwal Penerbangan spesial di{' '}
            <span className="text-purple-600">Tiketku!</span>
          </h2>

          <div className="space-y-6">
            {/* Row 1: From-To */}
            <div className="grid grid-cols-2 gap-8 items-center relative">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Plane size={16} className="rotate-45" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1 ml-2">From</div>
                  <input
                    type="text"
                    value="Jakarta (JKTA)"
                    className="w-full py-2 px-4 pl-10 border-b text-base focus:outline-none focus:border-purple-600"
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
                    className="w-full py-2 px-4 pl-10 border-b text-base focus:outline-none focus:border-purple-600"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Date and Passengers */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Side - Dates */}
              <div className="grid grid-cols-2 gap-4">
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
                      className="w-full py-2 px-4 pl-10 border-b text-base focus:outline-none focus:border-purple-600"
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
                        className="w-full py-2 px-4 pl-10 border-b text-base focus:outline-none focus:border-purple-600 placeholder-purple-600"
                      />
                    </div>
                    <div className="absolute right-0 top-0 mt-1">
                      <div className="w-8 h-4 bg-purple-600 rounded-full relative">
                        <div className="absolute right-0 w-4 h-4 bg-white rounded-full border-2 border-purple-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Passengers and Seat Class */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1 ml-2">To</div>
                    <input
                      type="text"
                      value="2 Penumpang"
                      className="w-full py-2 px-4 pl-10 border-b text-base focus:outline-none focus:border-purple-600"
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
                    className="w-full py-2 px-4 border-b text-base focus:outline-none focus:border-purple-600"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-purple-600 text-white py-2 rounded-b-xl font-medium hover:bg-purple-700 transition-colors text-base">
          Cari Penerbangan
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;
