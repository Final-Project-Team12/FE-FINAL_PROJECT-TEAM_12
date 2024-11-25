import { useState } from 'react';
import { Calendar } from 'lucide-react';
import SeatSelection from './SeatSelection';

const OrderForm = () => {
  const [hasFamily, setHasFamily] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([
    { hasFamily: false, title: 'Mr.' },
    { hasFamily: false, title: 'Mr.' },
  ]);

  const handlePassengerFamilyChange = (index, checked) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].hasFamily = checked;
    setPassengers(updatedPassengers);
  };

  return (
    <div className="mt-4 space-y-6 w-1/2">
      <div className="w-full border border-gray-300 rounded-lg p-6">
        <div>
          <h2 className="text-xl font-bold mb-6">Isi Data Pemesan</h2>

          <div className="bg-gray-800 text-white p-4 rounded-lg mb-8">
            <h3 className="text-xl font-semibold">Data Diri Pemesan</h3>
          </div>

          <form className="space-y-6">
            <div className="flex flex-col">
              <label className="text-purple-700 font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-purple-700 font-semibold">
                Punya Nama Keluarga?
              </label>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={hasFamily}
                  onChange={(e) => setHasFamily(e.target.checked)}
                />
                <span
                  className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                    hasFamily ? 'bg-purple-700' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-300 ${
                      hasFamily ? 'transform translate-x-6' : ''
                    }`}
                  ></span>
                </span>
              </div>
            </div>

            {hasFamily && (
              <div className="flex flex-col">
                <label className="text-purple-700 font-semibold mb-2">
                  Nama Keluarga
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama keluarga"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-purple-700 font-semibold mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                placeholder="Masukkan nomor telepon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-purple-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Contoh: johndoe@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full border border-gray-300 rounded-lg p-6">
        <div>
          <h2 className="text-xl font-bold mb-6">Isi Data Penumpang</h2>

          {passengers.map((passenger, index) => (
            <div key={index} className="mb-8">
              <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold">
                  Data Diri Penumpang {index + 1} - Adult
                </h3>
              </div>

              <form className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-purple-700 font-semibold mb-2">
                    Title
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
                    value={passenger.title}
                  >
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-purple-700 font-semibold mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-purple-700 font-semibold">
                    Punya Nama Keluarga?
                  </label>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      className="opacity-0 w-0 h-0"
                      checked={passenger.hasFamily}
                      onChange={(e) =>
                        handlePassengerFamilyChange(index, e.target.checked)
                      }
                    />
                    <span
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                        passenger.hasFamily ? 'bg-purple-700' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-300 ${
                          passenger.hasFamily ? 'transform translate-x-6' : ''
                        }`}
                      ></span>
                    </span>
                  </div>
                </div>

                {passenger.hasFamily && (
                  <div className="flex flex-col">
                    <label className="text-purple-700 font-semibold mb-2">
                      Nama Keluarga
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama keluarga"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <label className="text-purple-700 font-semibold mb-2">
                    Tanggal Lahir
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-purple-700 font-semibold mb-2">
                    Kewarganegaraan
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan kewarganegaraan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-purple-700 font-semibold mb-2">
                    KTP/Paspor
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nomor KTP/Paspor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-purple-700 font-semibold mb-2">
                    Negara Penerbit
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white">
                    <option value="">Pilih negara penerbit</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="singapore">Singapore</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-purple-700 font-semibold mb-2">
                    Berlaku Sampai
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
      {/* Seat Selection Section */}
      <SeatSelection
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        passengers={passengers}
      />

      <button className="w-full max-w-2xl bg-[#7126B5] text-white py-4 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity">
        Simpan
      </button>
    </div>
  );
};

export default OrderForm;
