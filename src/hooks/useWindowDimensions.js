import { useState, useEffect } from 'react';

export const useWindowDimensions = (headerHeight = 84) => {
  const [dimensions, setDimensions] = useState({
    containerHeight: 0,
    orderDetailsHeight: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        containerHeight: window.innerHeight - headerHeight,
        orderDetailsHeight: window.innerHeight - headerHeight - 20,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    return () => window.removeEventListener('resize', handleResize);
  }, [headerHeight]);

  return dimensions;
};
