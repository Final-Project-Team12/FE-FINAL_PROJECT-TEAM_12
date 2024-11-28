import { useEffect } from 'react';
import Icon from '../../../public/icons/flower_icon.svg';
import useFlightDetails from '../../hooks/useFlightDetails';

const FlightDetails = () => {
  const { flightDetails, loading, fetchFlightDetails } = useFlightDetails();

  useEffect(() => {
    fetchFlightDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!flightDetails) return null;

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-xl border border-gray-300">
      <h1 className="text-2xl font-bold mb-6">Detail Penerbangan</h1>

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-2xl font-bold">{flightDetails.departure.time}</p>
          <p className="text-gray-600">{flightDetails.departure.date}</p>
          <p className="text-gray-600">{flightDetails.departure.airport}</p>
        </div>
        <p className="text-[#7126B5] font-semibold">Keberangkatan</p>
      </div>

      <hr className="my-4" />

      <div className="flex items-center gap-4 mb-4">
        <img src={Icon} alt="airline" className="w-8 h-8" />
        <div>
          <h3 className="font-bold text-lg">{flightDetails.flight.airline}</h3>
          <p className="text-gray-600">{flightDetails.flight.code}</p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Informasi:</h4>
            <ul className="space-y-1">
              {flightDetails.flight.info.map((info, index) => (
                <li key={index} className="text-gray-600">
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-2xl font-bold">{flightDetails.arrival.time}</p>
          <p className="text-gray-600">{flightDetails.arrival.date}</p>
          <p className="text-gray-600">{flightDetails.arrival.airport}</p>
        </div>
        <p className="text-[#7126B5] font-semibold">Kedatangan</p>
      </div>

      <hr className="my-4" />

      <div>
        <h3 className="font-bold text-lg mb-4">Rincian Harga</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">
              {flightDetails.pricing.adults.count} Adults
            </p>
            <p className="text-gray-600">
              IDR {flightDetails.pricing.adults.price.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">
              {flightDetails.pricing.baby.count} Baby
            </p>
            <p className="text-gray-600">
              IDR {flightDetails.pricing.baby.price}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax</p>
            <p className="text-gray-600">
              IDR {flightDetails.pricing.tax.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between pt-4 border-t mt-4">
            <p className="font-bold text-xl">Total</p>
            <p className="font-bold text-xl text-[#7126B5]">
              IDR{' '}
              {(
                flightDetails.pricing.adults.price +
                flightDetails.pricing.baby.price +
                flightDetails.pricing.tax
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
