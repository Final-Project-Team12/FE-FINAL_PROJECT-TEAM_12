import React, { useState } from 'react';
import Navbar from './UI/Navbar';
import HeaderHistory from './UI/HeaderHistory';
import FlightTicketCard from './UI/FlightTicketCard';
import OrderDetails from './UI/OrderDetails';

const History = () => {
  const flightData = [
    {
      id: 1,
      airline: 'Jet Air - Economy',
      flightNumber: 'JT-203',
      departure: {
        location: 'Jakarta',
        time: '07:00',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
        code: 'JKT',
      },
      arrival: {
        location: 'Melbourne',
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
      status: 'Cancelled',
      bookingCode: 'XYZ98765',
      flightClass: 'First Class',
    },
  ];
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };
  const selectedCard =
    selectedCardId !== null
      ? flightData.find((flight) => flight.id === selectedCardId)
      : null;
  return (
    <>
      <Navbar />
      <HeaderHistory />
      <div>
        <div className="flex ml-[260px] mr-[212px]">
          <div className="max-w-6xl mx-auto px-4 flex space-x-6 mt-8 justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-[550px] px-4 pb-4 space-y-4">
                {flightData.map((flight) => (
                  <FlightTicketCard
                    key={flight.id}
                    flight={flight}
                    onCardClick={handleCardClick}
                    isSelected={flight.id === selectedCardId}
                  />
                ))}
              </div>
            </div>
            <div className="w-full">
              {selectedCard ? (
                <OrderDetails selectedCard={selectedCard} />
              ) : (
                <p>No card selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
