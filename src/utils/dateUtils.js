export const parseBookingDate = (dateString) => {
  return new Date(dateString);
};

export const sortFlightsByDate = (flights) => {
  if (!flights) return [];

  // Buat copy dari array sebelum melakukan sort
  return [...flights].sort((a, b) => {
    const aDate = parseBookingDate(a.transaction_date);
    const bDate = parseBookingDate(b.transaction_date);
    return bDate.getTime() - aDate.getTime();
  });
};

export const filterFlightsByDateRange = (flights, startDate, endDate) => {
  if (!startDate || !endDate || !flights) return flights || [];

  return flights.filter((flight) => {
    const transactionDate = parseBookingDate(flight.transaction_date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};
