import React from 'react';
import TravelCard from './UI/TravelCard';
import ImageDestination from '../../public/images/destination.jpeg';
import Navbar from './UI/Navbar';
import FlightSearch from './UI/FlightSearch';

const travelData = [
  {
    id: 1,
    from: 'Jakarta',
    to: 'Bangkok',
    airline: 'AirAsia',
    date: '20 - 30 Maret 2023',
    price: '950.000',
    image: ImageDestination,
    badge: 'Limited!',
  },
  {
    id: 2,
    from: 'Jakarta',
    to: 'Bangkok',
    airline: 'AirAsia',
    date: '20 - 30 Maret 2023',
    price: '950.000',
    image: ImageDestination,
    badge: 'Limited!',
  },
  {
    id: 3,
    from: 'Jakarta',
    to: 'Sydney',
    airline: 'AirAsia',
    date: '5 - 25 Maret 2023',
    price: '3.650.000',
    image: ImageDestination,
    badge: '50% OFF',
  },
  {
    id: 4,
    from: 'Jakarta',
    to: 'Sydney',
    airline: 'AirAsia',
    date: '5 - 25 Maret 2023',
    price: '3.650.000',
    image: ImageDestination,
    badge: '50% OFF',
  },
  {
    id: 5,
    from: 'Jakarta',
    to: 'Bangkok',
    airline: 'AirAsia',
    date: '20 - 30 Maret 2023',
    price: '950.000',
    image: ImageDestination,
    badge: 'Limited!',
  },
];

const Home = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <Navbar />
        <FlightSearch />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {travelData.map((travel) => (
            <TravelCard
              key={travel.id}
              from={travel.from}
              to={travel.to}
              airline={travel.airline}
              date={travel.date}
              price={travel.price}
              image={travel.image}
              badge={travel.badge}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
