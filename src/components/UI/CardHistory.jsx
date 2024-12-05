import React, { useState } from 'react';

const CardHistory = () => {
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
      status: 'Issued', // Status for the label
      bookingCode: 'ABC12345', // Booking code
      flightClass: 'Economy', // Flight class
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
      status: 'Unpaid', // Status for the label
      bookingCode: 'DEF67890', // Booking code
      flightClass: 'Business', // Flight class
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
      status: 'Cancelled', // Status for the label
      bookingCode: 'XYZ98765', // Booking code
      flightClass: 'First Class', // Flight class
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Function to set the background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued':
        return 'bg-green-500'; // Green for Issued
      case 'Unpaid':
        return 'bg-red-500'; // Red for Unpaid
      case 'Cancelled':
        return 'bg-gray-500'; // Gray for Cancelled
      default:
        return 'bg-gray-200';
    }
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
          <div
            className="p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleAccordion(flight.id)}
          >
            <span
              className={`text-white text-xs font-light rounded-full px-3 py-1 ${getStatusColor(flight.status)}`}
            >
              {flight.status}
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-yellow-100 rounded">
                  <img
                    src="path_to_image/airline_logo.svg"
                    alt="Airline Logo"
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-sm font-medium">{flight.airline}</span>
              </div>
            </div>

            {/* Flight Info */}
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="font-medium text-black">
                    {flight.departure.date}
                  </div>
                  <div>{flight.departure.airport}</div>
                </div>

                <div className="text-center">
                  <div className="font-medium text-black">
                    {flight.departure.time}
                  </div>
                  <div className="text-xs text-gray-500">{flight.duration}</div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="font-medium text-black">
                    {flight.arrival.time}
                  </div>
                  <div>{flight.arrival.airport}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded content */}
          {openId === flight.id && (
            <div className="p-4 bg-white">
              <div className="space-y-4">
                {/* Booking Code and Class */}
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    Booking Code:{' '}
                    <span className="font-semibold text-black">
                      {flight.bookingCode}
                    </span>
                  </div>
                  <div>
                    Class:{' '}
                    <span className="font-semibold text-black">
                      {flight.flightClass}
                    </span>
                  </div>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Price */}
                <div className="flex justify-between items-center text-lg font-bold text-purple-600">
                  <div className="text-xl">{flight.price}</div>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Flight Info */}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600">
                      Informasi:
                    </h3>
                    <p className="text-sm">Baggage: 20 kg</p>
                    <p className="text-sm">Cabin Baggage: 7 kg</p>
                    <p className="text-sm">
                      {flight.flightClass === 'Economy'
                        ? 'In-flight Entertainment Available'
                        : 'No Entertainment'}
                    </p>
                  </div>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Arrival Info */}
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    Arrival Time:{' '}
                    <span className="font-semibold text-black">
                      {flight.arrival.time}
                    </span>
                  </div>
                  <div>
                    Arrival Airport:{' '}
                    <span className="font-semibold text-black">
                      {flight.arrival.airport}
                    </span>
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

export default CardHistory;
