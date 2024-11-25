import React, { useEffect } from 'react';
import Navbar from './UI/Navbar';
import FlightSearch from './UI/FlightSearch';
import Banner from './Elements/Banner/Banner';
import DestinationFilter from './UI/DestinationFilter';
import ImageDestination from '../../public/images/destination.jpeg';
import { useFetchAllDestinations } from '../hooks/useDestination';

const Home = () => {
  // const { travelData } = useFetchAllDestinations.destination;
  // useEffect(() => {
  //   useFetchAllDestinations.fetchAllDestinations();
  //   // let data = useFetchAllDestinations.destination;
  //   // console.log(data);
  // }, []);

  const { destination, loading, error, fetchAllDestinations } =
    useFetchAllDestinations();

  useEffect(() => {
    fetchAllDestinations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <main className="mx-auto py-4">
        <div className="relative">
          <Banner />
          <FlightSearch />
          <DestinationFilter travelData={destination} />
        </div>
      </main>
    </div>
  );
};

export default Home;
