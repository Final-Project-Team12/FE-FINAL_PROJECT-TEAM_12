import React from 'react';
import FlowerLogo from '../../../../public/icons/flower_icon.svg';

const OrderDetailsModal = ({ selectedCard, onClose }) => {
  console.log('HELOOOO');
  console.log('INI DATA DI MODAL' + selectedCard);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued':
        return 'bg-green-500'; // Green for Issued
      case 'Unpaid':
        return 'bg-red-500'; // Red for Unpaid
      case 'Cancelled':
        return 'bg-gray-500'; // Gray for Cancelled
      default:
        return 'bg-gray-200';
    }
  };

  const totalPriceAll =
    selectedCard.pricePerPerson * selectedCard.totalPassengers +
    selectedCard.tax;
  selectedCard.totalPriceAll = totalPriceAll;

  const totalPrice = selectedCard.pricePerPerson * selectedCard.totalPassengers;

  return (
    <div className="relative inset-0 z-50 flex ">
      <div className="relative w-auto max-w-md mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none mt-4 z-20">
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-20"
            onClick={onClose}
          >
            ×
          </button>

          <div className="relative p-6 flex-auto">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold mb-2">Detail Pesanan</h2>
                </div>
                <div>
                  <span
                    className={`text-white text-xs font-light rounded-full px-3 py-1 ${getStatusColor(selectedCard.status)}`}
                  >
                    {selectedCard.status}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <h2 className="font-regular">
                  Booking Code:{' '}
                  <span className="text-purple-800 font-bold">
                    {selectedCard.bookingCode}
                  </span>
                </h2>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>
                    <p className="font-bold">{selectedCard.departure.time}</p>
                  </div>
                  <div>
                    <p className="text-sm">{selectedCard.departure.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-purple-500 font-bold text-sm">
                    Kebarangkatan
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <p className="font-medium text-sm">
                    {selectedCard.departure.airport}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-4 mb-2">
                <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200"></hr>
              </div>
              <div className="flex flex-start">
                <div className="w-10 flex justify-center p-2">
                  <img className="" src={FlowerLogo} alt="" />
                </div>
                <div className="flex flex-col">
                  <div>
                    <p className="font-bold">{selectedCard.airline}</p>
                    <p className="font-bold">{selectedCard.flightNumber}</p>
                  </div>
                  <div className="pt-4">
                    <p className="font-bold text-sm">Informasi:</p>
                    {selectedCard.passengers?.map((passenger, index) => (
                      <div
                        key={passenger.id || index}
                        className="flex flex-col"
                      >
                        <div
                          key={passenger.id}
                          className="flex flex-row text-purple-800"
                        >
                          <span className="font-regular text-sm">
                            {`Penumpang ${index + 1}: `}&nbsp;
                          </span>
                          <p className="font-regular text-sm">{`${passenger.title} ${passenger.firstName} ${passenger.lastName}`}</p>
                        </div>
                        <div>
                          <p className="text-sm">
                            ID : <span>{passenger.idNumber}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4 mb-2">
                <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200"></hr>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>
                    <p className="font-bold">{selectedCard.arrival.time}</p>
                  </div>
                  <div>
                    <p className="text-sm">{selectedCard.arrival.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-purple-500 font-bold text-sm">
                    Kedatangan
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <p className="font-medium text-sm">
                    {selectedCard.arrival.airport}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-4 mb-2">
                <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200"></hr>
              </div>
              <div className="flex justify-col ml-5">
                <div>
                  <p className="font-bold text-sm">Rincian Harga</p>
                </div>
              </div>
              <div className="flex justify-between ml-5 text-sm font-regular">
                <p>{selectedCard.totalPassengers} Adults</p>
                <p>IDR {totalPrice.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-between ml-5 text-sm font-regular">
                <p>1 Baby</p>
                <p>IDR 0</p>
              </div>
              <div className="flex justify-between ml-5 text-sm font-regular">
                <p>Tax</p>
                <p>IDR {selectedCard.tax.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-center mt-4 mb-2">
                <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200"></hr>
              </div>
              <div className="w-11/12 flex justify-between ml-5">
                <p className="font-bold">Total</p>
                <p className="font-bold text-purple-800">
                  IDR {totalPriceAll.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="w-full mt-4">
                {selectedCard.status === 'Issued' && (
                  <button className="w-full h-16 bg-purple-800 text-white px-4 py-2 rounded-lg">
                    Cetak Ticket
                  </button>
                )}
                {selectedCard.status === 'Unpaid' && (
                  <button className="w-full h-16 bg-red-500 text-white px-4 py-2 rounded-lg">
                    Lanjut Bayar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div className="fixed inset-0 z-10 bg-black opacity-25"></div>
    </div>
  );
};

export default OrderDetailsModal;
