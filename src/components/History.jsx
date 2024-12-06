import React, { useState, useEffect, useRef } from 'react';
import Navbar from './UI/Navbar';
import HeaderHistory from './UI/HeaderHistory';
import FlightTicketCard from './UI/FlightTicketCard';
import OrderDetails from './UI/OrderDetails/OrderDetails';
import styles from './UI/OrderDetails/OrderDetails.module.css';

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
      pricePerPerson: 4500000,
      tax: 450000,
      status: 'Issued',
      bookingCode: 'ABC12345',
      flightClass: 'Economy',
      passengers: [
        {
          id: 'P1',
          type: 'Adult',
          title: 'Mr',
          firstName: 'John',
          lastName: 'Doe',
          nationality: 'Indonesian',
          idNumber: 'A12345678',
          seatNumber: '12A',
          baggage: '20 kg',
          specialRequests: 'Vegetarian Meal',
        },
        {
          id: 'P2',
          type: 'Child',
          title: 'Ms',
          firstName: 'Jane',
          lastName: 'Doe',
          nationality: 'Indonesian',
          idNumber: 'B87654321',
          seatNumber: '12B',
          baggage: '20 kg',
          specialRequests: 'Child Meal',
        },
      ],
      totalPassengers: 2,
    },
    {
      id: 2,
      airline: 'Jet Air - Economy',
      flightNumber: 'JT-205',
      departure: {
        location: 'Jakarta',
        time: '08:00',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
        code: 'JKT',
      },
      arrival: {
        location: 'Melbourne',
        time: '12:00',
        date: '3 Maret 2023',
        airport: 'Melbourne International Airport',
        code: 'MLB',
      },
      duration: '1h 15m',
      pricePerPerson: 5500000,
      tax: 450000,
      status: 'Unpaid',
      bookingCode: 'DEF67890',
      flightClass: 'Business',
      passengers: [
        {
          id: 'P3',
          type: 'Adult',
          title: 'Mrs',
          firstName: 'Sarah',
          lastName: 'Smith',
          nationality: 'Australian',
          idNumber: 'C98765432',
          seatNumber: '3F',
          baggage: '30 kg',
          specialRequests: 'Wheelchair Assistance',
        },
      ],
      totalPassengers: 1,
    },
    {
      id: 3,
      airline: 'Jet Air - Economy',
      flightNumber: 'JT-207',
      departure: {
        location: 'Jakarta',
        time: '13:15',
        date: '3 Maret 2023',
        airport: 'Soekarno Hatta - Terminal 1A Domestik',
        code: 'JKT',
      },
      arrival: {
        location: 'Melbourne',
        time: '17:15',
        date: '3 Maret 2023',
        airport: 'Melbourne International Airport',
        code: 'MLB',
      },
      duration: '1h 15m',
      pricePerPerson: 6750000,
      tax: 475000,
      status: 'Cancelled',
      bookingCode: 'XYZ98765',
      flightClass: 'First Class',
      passengers: [
        {
          id: 'P4',
          type: 'Adult',
          title: 'Dr',
          firstName: 'Michael',
          lastName: 'Johnson',
          nationality: 'British',
          idNumber: 'D45678901',
          seatNumber: '1A',
          baggage: '40 kg',
          specialRequests: 'Diabetic Meal',
        },
        {
          id: 'P5',
          type: 'Adult',
          title: 'Mrs',
          firstName: 'Emma',
          lastName: 'Johnson',
          nationality: 'British',
          idNumber: 'E12345678',
          seatNumber: '1B',
          baggage: '40 kg',
          specialRequests: 'Gluten-free Meal',
        },
      ],
      totalPassengers: 2,
    },
  ];

  const [selectedCardId, setSelectedCardId] = useState(null);
  const orderDetailsRef = useRef(null);
  const [orderDetailsHeight, setOrderDetailsHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };
  const selectedCard =
    selectedCardId !== null
      ? flightData.find((flight) => flight.id === selectedCardId)
      : null;

  useEffect(() => {
    const handleResize = () => {
      if (orderDetailsRef.current) {
        setOrderDetailsHeight(orderDetailsRef.current.offsetHeight);
      }
      setContainerHeight(window.innerHeight - 84); // Subtract the header height
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeaderHistory />
      <div className="flex flex-col lg:flex-row gap-12 px-[260px] py-4 min-h-[calc(100vh-84px)]">
        <div className="lg:w-3/5 sm:w-full space-y-4">
          {flightData.map((flight) => (
            <FlightTicketCard
              key={flight.id}
              flight={flight}
              onCardClick={handleCardClick}
              isSelected={flight.id === selectedCardId}
            />
          ))}
        </div>
        <div
          ref={orderDetailsRef}
          className={`${styles.orderDetailsContainer} ${selectedCard ? '' : 'hidden'}`}
          style={{
            maxHeight: selectedCard ? `${containerHeight - 20}px` : 'none',
            overflow: 'auto',
          }}
        >
          {selectedCard ? (
            <OrderDetails
              className={styles.orderDetailsContainer}
              selectedCard={selectedCard}
            />
          ) : (
            <p className="text-center text-gray-500">
              Select a flight to view details
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
