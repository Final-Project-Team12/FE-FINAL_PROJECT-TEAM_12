import React, { useEffect, useState } from 'react';
import Navbar from './UI/Navbar';
import FlightSearch from './UI/FlightSearch';
import Banner from './Elements/Banner/Banner';
import DestinationFilter from './UI/DestinationFilter';
import { useDispatch } from 'react-redux';
import { resetFlightSearch } from '../store/slices/flightSearchSlice';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(resetFlightSearch());
    }
  }, [location, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <main className="mx-auto py-4">
        <div className="relative">
          <Banner />
          <FlightSearch />
          <DestinationFilter />
        </div>
      </main>
    </div>
  );
};

export default Home;
