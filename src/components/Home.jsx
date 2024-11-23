import React from 'react';
import Navbar from './UI/Navbar';
import FlightSearch from './UI/FlightSearch';
import Banner from './Elements/Banner/Banner';
import DestinationFilter from './UI/DestinationFilter';
import ImageDestination from '../../public/images/destination.jpeg';

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 lg:px-6 py-4">
        <div className="relative">
          <Banner />
          <FlightSearch />
          <DestinationFilter travelData={travelData} />
        </div>
      </main>
    </div>
  );
};

export default Home;
