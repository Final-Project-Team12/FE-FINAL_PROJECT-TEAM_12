import React, { useEffect, useState } from 'react';
import Navbar from './UI/Navbar';
import FlightSearch from './UI/FlightSearch';
import Banner from './Elements/Banner/Banner';
import DestinationFilter from './UI/DestinationFilter';
import { useFetchAllDestinations } from '../hooks/useDestination';

const Home = () => {
  const { destination, loading, error, fetchAllDestinations } =
    useFetchAllDestinations();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    fetchAllDestinations();

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <main className="mx-auto py-4">
        <div className="relative">
          <Banner />
          <FlightSearch />
          <DestinationFilter
            travelData={destination}
            loading={loading}
            showSkeleton={showSkeleton}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
