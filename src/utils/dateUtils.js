export const parseBookingDate = (dateString) => {
  const [day, month, year] = dateString.split(' ');
  return new Date(`${month} ${day}, ${year}`);
};

export const sortFlightsByDate = (flights) => {
  return [...flights].sort((a, b) => {
    const aDate = parseBookingDate(a.bookingDate);
    const bDate = parseBookingDate(b.bookingDate);
    return bDate.getTime() - aDate.getTime();
  });
};

export const filterFlightsByDateRange = (flights, startDate, endDate) => {
  if (!startDate || !endDate) return flights;

  return flights.filter((flight) => {
    const bookingDate = parseBookingDate(flight.bookingDate);
    return bookingDate >= startDate && bookingDate <= endDate;
  });
};
