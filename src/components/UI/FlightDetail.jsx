import { useSelector } from 'react-redux';

const FlightDetails = () => {
  const {
    selectedDepartureFlight,
    selectedReturnFlight,
    isRoundTrip,
    passengerCounts,
    selectedSeatClass,
  } = useSelector((state) => state.flightSearch);

  const calculatePrices = () => {
    if (!selectedDepartureFlight) return { basePrice: 0, tax: 0, total: 0 };

    let totalBasePrice = 0;

    // Calculate departure price
    const departureSeatPrice =
      selectedDepartureFlight.seats_detail.find(
        (seat) => seat.class === selectedSeatClass
      )?.price || 0;

    totalBasePrice +=
      (passengerCounts.adult + passengerCounts.child) * departureSeatPrice;

    // Add return price if applicable
    if (isRoundTrip && selectedReturnFlight) {
      const returnSeatPrice =
        selectedReturnFlight.seats_detail.find(
          (seat) => seat.class === selectedSeatClass
        )?.price || 0;
      totalBasePrice +=
        (passengerCounts.adult + passengerCounts.child) * returnSeatPrice;
    }

    const tax = Math.round(totalBasePrice * 0.1);

    return {
      basePrice: totalBasePrice,
      tax: tax,
      total: totalBasePrice + tax,
    };
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      time: date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      date: date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
  };

  if (!selectedDepartureFlight) return <div>No flight selected</div>;

  const prices = calculatePrices();

  const renderFlightSection = (flight, type) => {
    if (!flight) return null;

    return (
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
          {type === 'departure'
            ? 'Penerbangan Keberangkatan'
            : 'Penerbangan Kembali'}
        </h2>
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div>
            <p className="text-xl sm:text-2xl font-bold">
              {formatDateTime(flight.departure_time).time}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              {formatDateTime(flight.departure_time).date}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              {flight.origin_airport.name} - {flight.departure_terminal}
            </p>
          </div>
          <p className="text-[#7126B5] font-semibold text-sm sm:text-base">
            Keberangkatan
          </p>
        </div>

        <hr className="my-3 sm:my-4" />

        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
          <img
            src={flight.airline.image_url}
            alt={flight.airline.airline_name}
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />
          <div className="flex-1">
            <h3 className="font-bold text-base sm:text-lg">
              {flight.airline.airline_name}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {flight.plane_code}
            </p>
            <div className="mt-3 sm:mt-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                Informasi:
              </h4>
              <ul className="space-y-1">
                <li className="text-gray-600 text-sm sm:text-base">
                  Baggage {flight.baggage_capacity}kg
                </li>
                <li className="text-gray-600 text-sm sm:text-base">
                  Cabin baggage {flight.cabin_baggage_capacity}kg
                </li>
                {flight.in_flight_entertainment && (
                  <li className="text-gray-600 text-sm sm:text-base">
                    In Flight Entertainment
                  </li>
                )}
                {flight.meal_available && (
                  <li className="text-gray-600 text-sm sm:text-base">
                    Makanan Tersedia
                  </li>
                )}
                {flight.wifi_available && (
                  <li className="text-gray-600 text-sm sm:text-base">
                    Wifi Tersedia
                  </li>
                )}
                {flight.power_outlets && (
                  <li className="text-gray-600 text-sm sm:text-base">
                    Stop Kontak Tersedia
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-3 sm:my-4" />

        <div className="flex justify-between items-start">
          <div>
            <p className="text-xl sm:text-2xl font-bold">
              {formatDateTime(flight.arrival_time).time}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              {formatDateTime(flight.arrival_time).date}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              {flight.destination_airport.name}
            </p>
          </div>
          <p className="text-[#7126B5] font-semibold text-sm sm:text-base">
            Kedatangan
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-6 w-full border border-gray-300">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Detail Penerbangan
      </h1>

      {/* Departure Flight */}
      {renderFlightSection(selectedDepartureFlight, 'departure')}

      {/* Return Flight if exists */}
      {isRoundTrip && selectedReturnFlight && (
        <>
          <hr className="my-4 sm:my-6" />
          {renderFlightSection(selectedReturnFlight, 'return')}
        </>
      )}

      <hr className="my-4" />

      {/* Price Details */}
      <div>
        <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
          Rincian Harga
        </h3>
        <div className="space-y-2">
          {passengerCounts.adult > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 text-sm sm:text-base">
                {passengerCounts.adult} Adults
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                IDR{' '}
                {(
                  passengerCounts.adult *
                  (selectedDepartureFlight.seats_detail.find(
                    (seat) => seat.class === selectedSeatClass
                  )?.price +
                    (isRoundTrip && selectedReturnFlight
                      ? selectedReturnFlight.seats_detail.find(
                          (seat) => seat.class === selectedSeatClass
                        )?.price
                      : 0))
                ).toLocaleString()}
              </p>
            </div>
          )}
          {passengerCounts.child > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 text-sm sm:text-base">
                {passengerCounts.child} Child
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                IDR{' '}
                {(
                  passengerCounts.child *
                  (selectedDepartureFlight.seats_detail.find(
                    (seat) => seat.class === selectedSeatClass
                  )?.price +
                    (isRoundTrip && selectedReturnFlight
                      ? selectedReturnFlight.seats_detail.find(
                          (seat) => seat.class === selectedSeatClass
                        )?.price
                      : 0))
                ).toLocaleString()}
              </p>
            </div>
          )}
          {passengerCounts.infant > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-600 text-sm sm:text-base">
                {passengerCounts.infant} Infant
              </p>
              <p className="text-gray-600 text-sm sm:text-base">IDR 0</p>
            </div>
          )}
          <div className="flex justify-between">
            <p className="text-gray-600 text-sm sm:text-base">Tax</p>
            <p className="text-gray-600 text-sm sm:text-base">
              IDR {prices.tax.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between pt-3 sm:pt-4 border-t mt-3 sm:mt-4">
            <p className="font-bold text-lg sm:text-xl">Total</p>
            <p className="font-bold text-lg sm:text-xl text-[#7126B5]">
              IDR {prices.total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
