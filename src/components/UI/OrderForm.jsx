import React from 'react';
import SeatSelection from './SeatSelection';
import useOrderForm from '../../hooks/useOrderForm';

const DatePicker = ({ value, onChange, label, className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-[#7126B5] font-semibold mb-2">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5] cursor-pointer"
      />
    </div>
  );
};

const ToggleSwitch = ({ isChecked, onChange, label }) => {
  return (
    <div className="flex items-center justify-between">
      <label className="text-[#7126B5] font-semibold">{label}</label>
      <label className="relative inline-block w-12 h-6 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="absolute w-12 h-6 bg-gray-300 peer-checked:bg-[#7126B5] rounded-full transition-all duration-300">
          <div
            className={`absolute w-5 h-5 bg-white rounded-full left-0.5 bottom-0.5 transition-all duration-300 ${isChecked ? 'translate-x-6' : 'translate-x-0'}`}
          ></div>
        </div>
      </label>
    </div>
  );
};

const OrderForm = ({ onSubmitSuccess }) => {
  const {
    hasFamily,
    setHasFamily,
    selectedSeats,
    setSelectedSeats,
    formData,
    handleOrderInputChange,
    handlePassengerInputChange,
    handlePassengerFamilyChange,
    handleSubmit,
    NATIONALITIES,
    isSubmitted,
  } = useOrderForm();

  const handleFormSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      onSubmitSuccess();
    }
  };

  return (
    <div className="mt-4 space-y-6 w-full">
      <div className="w-full border border-gray-300 rounded-lg p-6">
        <div>
          <h2 className="text-xl font-bold mb-6">Isi Data Pemesan</h2>
          <div className="bg-gray-800 text-white p-4 rounded-t-lg mb-8">
            <h3 className="text-xl font-semibold">Data Diri Pemesan</h3>
          </div>
          <form className="space-y-6">
            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.orderName}
                onChange={(e) =>
                  handleOrderInputChange('orderName', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <ToggleSwitch
              isChecked={hasFamily}
              onChange={(e) => setHasFamily(e.target.checked)}
              label="Punya Nama Keluarga?"
            />

            {hasFamily && (
              <div className="flex flex-col">
                <label className="text-[#7126B5] font-semibold mb-2">
                  Nama Keluarga
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama keluarga"
                  value={formData.orderFamily}
                  onChange={(e) =>
                    handleOrderInputChange('orderFamily', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                placeholder="Masukkan nomor telepon"
                value={formData.phone}
                onChange={(e) =>
                  handleOrderInputChange('phone', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Contoh: johndoe@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  handleOrderInputChange('email', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full border border-gray-300 rounded-lg p-6">
        <div>
          <h2 className="text-xl font-bold mb-6">Isi Data Penumpang</h2>
          <div className="bg-gray-800 text-white p-4 rounded-t-lg mb-6">
            <h3 className="text-xl font-semibold">
              Data Diri Penumpang - Adult
            </h3>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">Title</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5] appearance-none bg-white cursor-pointer"
                value={formData.passenger.title}
                onChange={(e) =>
                  handlePassengerInputChange('title', e.target.value)
                }
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.passenger.fullName}
                onChange={(e) =>
                  handlePassengerInputChange('fullName', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <ToggleSwitch
              isChecked={formData.passenger.hasFamily}
              onChange={(e) => handlePassengerFamilyChange(e.target.checked)}
              label="Punya Nama Keluarga?"
            />

            {formData.passenger.hasFamily && (
              <div className="flex flex-col">
                <label className="text-[#7126B5] font-semibold mb-2">
                  Nama Keluarga
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama keluarga"
                  value={formData.passenger.familyName}
                  onChange={(e) =>
                    handlePassengerInputChange('familyName', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
                />
              </div>
            )}

            <DatePicker
              label="Tanggal Lahir"
              value={formData.passenger.birthDate}
              onChange={(value) =>
                handlePassengerInputChange('birthDate', value)
              }
            />

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Kewarganegaraan
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5] appearance-none bg-white cursor-pointer"
                value={formData.passenger.nationality}
                onChange={(e) =>
                  handlePassengerInputChange('nationality', e.target.value)
                }
              >
                <option value="">Pilih kewarganegaraan</option>
                {NATIONALITIES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                KTP/Paspor
              </label>
              <input
                type="text"
                placeholder="Masukkan nomor KTP/Paspor"
                value={formData.passenger.idNumber}
                onChange={(e) =>
                  handlePassengerInputChange('idNumber', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#7126B5] font-semibold mb-2">
                Negara Penerbit
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7126B5] appearance-none bg-white cursor-pointer"
                value={formData.passenger.issuingCountry}
                onChange={(e) =>
                  handlePassengerInputChange('issuingCountry', e.target.value)
                }
              >
                <option value="">Pilih negara penerbit</option>
                {NATIONALITIES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <DatePicker
              label="Berlaku Sampai"
              value={formData.passenger.expiryDate}
              onChange={(value) =>
                handlePassengerInputChange('expiryDate', value)
              }
            />
          </form>
        </div>
      </div>

      <SeatSelection
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        maxSeats={1}
      />

      <div className="mx-auto w-[95%]">
        <button
          onClick={handleFormSubmit}
          disabled={isSubmitted}
          className={`w-full max-w-2xl ${
            isSubmitted
              ? 'bg-[#D0D0D0] cursor-not-allowed'
              : 'bg-[#7126B5] hover:opacity-90'
          } text-white py-4 rounded-lg text-xl font-semibold transition-all`}
        >
          {isSubmitted ? 'Simpan' : 'Simpan'}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
