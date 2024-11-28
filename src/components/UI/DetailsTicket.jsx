import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsTicket = () => {
  const navigate = useNavigate();

  const handleToCheckOut = () => {
    navigate('/checkout');
  };

  const flights = [
    {
      id: 1,
      airline: 'Jet Air - Economy',
      flightNumber: 'JT-203',
      departure: {
        time: '07:00',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
        code: 'JKT',
      },
      arrival: {
        time: '11:00',
        date: '3 Maret 2023',
        airport: 'Melbourne International Airport',
        code: 'MLB',
      },
      duration: '4h 0m',
      price: 'IDR 4.950.000',
      info: {
        baggage: '20 kg',
        cabinBaggage: '7 kg',
        entertainment: true,
      },
    },
    {
      id: 2,
      airline: 'Jet Air - Economy',
      flightNumber: 'JT-205',
      departure: {
        time: '08:00',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
        code: 'JKT',
      },
      arrival: {
        time: '12:00',
        date: '3 Maret 2023',
        airport: 'Melbourne International Airport',
        code: 'MLB',
      },
      duration: '4h 0m',
      price: 'IDR 5.950.000',
      info: {
        baggage: '20 kg',
        cabinBaggage: '7 kg',
        entertainment: true,
      },
    },
    {
      id: 3,
      airline: 'Jet Air - Economy',
      flightNumber: 'JT-207',
      departure: {
        time: '13:15',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
        code: 'JKT',
      },
      arrival: {
        time: '17:15',
        date: '3 Maret 2023',
        airport: 'Melbourne International Airport',
        code: 'MLB',
      },
      duration: '4h 0m',
      price: 'IDR 7.225.000',
      info: {
        baggage: '20 kg',
        cabinBaggage: '7 kg',
        entertainment: true,
      },
    },
    {
      id: 4,
      airline: 'Jet Air - Economy',
      flightNumber: 'JT-209',
      departure: {
        time: '20:15',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
        code: 'JKT',
      },
      arrival: {
        time: '23:30',
        date: '3 Maret 2023',
        airport: 'Melbourne International Airport',
        code: 'MLB',
      },
      duration: '3h 15m',
      price: 'IDR 8.010.000',
      info: {
        baggage: '20 kg',
        cabinBaggage: '7 kg',
        entertainment: true,
      },
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full px-4 pb-4 space-y-4">
      {flights.map((flight) => (
        <div
          key={flight.id}
          className={`border-2 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-200 ${
            openId === flight.id
              ? 'border-purple-500'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {/* Header section */}
          <div
            className="p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleAccordion(flight.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-yellow-100 rounded">
                  <img src="../../public/icons/Thumbnail.svg" alt="" />
                </div>
                <span className="text-[12px] font-medium">
                  {flight.airline}
                </span>
              </div>
              <img src="../../public/icons/Neutral button.svg" alt="" />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-left">
                  <div className="text-[14px] font-bold">
                    {flight.departure.time}
                  </div>
                  <div className="text-[12px]">{flight.departure.code}</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[12px] text-[#8A8A8A]">
                    {flight.duration}
                  </div>
                  <img src="../../public/icons/Arrow.svg" alt="" />
                  <div className="text-[12px] text-[#8A8A8A]">Direct</div>
                </div>

                <div className="text-left">
                  <div className="text-[14px] font-bold">
                    {flight.arrival.time}
                  </div>
                  <div className="text-[12px]">{flight.arrival.code}</div>
                </div>

                <img
                  src="../../public/icons/icon-park-outline_baggage-delay.svg"
                  alt=""
                />
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">
                  {flight.price}
                </div>
                <button
                  className="mt-1 px-6 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors duration-200"
                  onClick={handleToCheckOut}
                >
                  Pilih
                </button>
              </div>
            </div>
          </div>

          {/* Expanded content */}
          {openId === flight.id && (
            <div className="p-4 bg-white">
              <div className="space-y-4">
                <div>
                  <hr className="mb-[22px] border-[#8A8A8A]" />

                  <h3 className="text-[14px] font-bold text-[#4B1979] mb-2">
                    Detail Penerbangan
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between">
                        <div className="text-[16px] font-bold flex">
                          {flight.departure.time}
                        </div>
                        <p className="text-[12px] font-bold text-[#A06ECE]">
                          Keberangkatan
                        </p>
                      </div>
                      <div className="text-[14px]">{flight.departure.date}</div>
                      <div className="text-[14px] font-medium">
                        {flight.departure.airport}
                      </div>
                    </div>

                    <hr className="w-1/2 mx-auto" />

                    <div className="flex flex-row gap-3">
                      <img src="../../public/icons/Thumbnail.svg" alt="" />
                      <div className="flex flex-col gap-3">
                        <div>
                          <div className="text-[14px] font-bold">
                            {flight.airline}
                          </div>
                          <div className="text-[14px] font-bold">
                            {flight.flightNumber}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[14px] font-bold">Informasi:</h3>
                          <p className="text-[14px]">
                            Baggaage {flight.info.baggage}
                          </p>
                          <p className="text-[14px] ">
                            Cabin baggaage {flight.info.cabinBaggage}
                          </p>
                          <p className="text-[14px] ">
                            {flight.info.entertainment
                              ? 'In Flight Entertainment'
                              : 'Non-Entertainment'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr className="w-1/2 mx-auto" />

                    <div>
                      <div className="flex justify-between">
                        <div className="text-[14px] font-bold">
                          {flight.arrival.time}
                        </div>
                        <p className="text-[12px] font-bold text-[#A06ECE]">
                          Kedatangan
                        </p>
                      </div>
                      <div className="text-[14px]">{flight.arrival.date}</div>
                      <div className="text-[14px] font-medium">
                        {flight.arrival.airport}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DetailsTicket;
