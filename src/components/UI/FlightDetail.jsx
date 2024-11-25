import Icon from '../../../public/icons/flower_icon.svg';

const FlightDetails = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 w-full max-w-xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-700 font-semibold text-xl">07:00</p>
          <p className="text-gray-500 text-lg">3 Maret 2023</p>
          <p className="text-gray-500 text-lg">
            Soekarno Hatta - Terminal 1A Domestik
          </p>
        </div>
        <h2 className="text-gray-700 font-bold text-xl">Keberangkatan</h2>
      </div>
      <hr className="border-gray-300 my-4" />
      <div className="flex items-center">
        <img src={Icon} alt="icon" className="w-8 h-8 mr-4" />
        <div>
          <h3 className="text-gray-700 font-bold text-lg">Jet Air - Economy</h3>
          <p className="text-gray-500 text-lg">JT - 203</p>
          <div className="mt-4">
            <h4 className="text-gray-700 font-semibold text-lg">Informasi:</h4>
            <ul className="text-gray-500 space-y-2 text-lg">
              <li>Baggage 20 kg</li>
              <li>Cabin baggage 7 kg</li>
              <li>In Flight Entertainment</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 my-4" />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-700 font-semibold text-xl">11:00</p>
          <p className="text-gray-500 text-lg">3 Maret 2023</p>
          <p className="text-gray-500 text-lg">
            Melbourne International Airport
          </p>
        </div>
        <h2 className="text-gray-700 font-bold text-xl">Kedatangan</h2>
      </div>
      <hr className="border-gray-300 my-4" />
      <div>
        <h3 className="text-gray-700 font-bold text-lg">Rincian Harga</h3>
        <div className="flex justify-between text-gray-500 text-lg">
          <p>2 Adults</p>
          <p>IDR 9.550.000</p>
        </div>
        <div className="flex justify-between text-gray-500 text-lg">
          <p>1 Baby</p>
          <p>IDR 0</p>
        </div>
        <div className="flex justify-between text-gray-500 text-lg">
          <p>Tax</p>
          <p>IDR 300.000</p>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-4 text-purple-700 font-bold text-2xl mt-4">
          <p className="text-xl text-black">Total</p>
          <p>IDR 9.850.000</p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
