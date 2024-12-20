import React from 'react';
import FlowerLogo from '../../../../public/icons/flower_icon.svg';

const OrderDetails = ({ selectedCard }) => {
  if (!selectedCard) return null;

  const { tickets, status, token, total_payment } = selectedCard;
  const firstTicket = tickets[0];
  const flightDetails = firstTicket?.plane || {};

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'ISSUED':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold mb-2">Detail Pesanan</h2>
        </div>
        <div>
          <span
            className={`text-white text-xs font-light rounded-full px-3 py-1 ${getStatusColor(status)}`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <h2 className="font-regular">
          Booking Code:{' '}
          <span className="text-purple-800 font-bold">{token}</span>
        </h2>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div>
            <p className="font-bold">
              {formatTime(flightDetails.departure_time)}
            </p>
          </div>
          <div>
            <p className="text-sm">
              {formatDate(flightDetails.departure_time)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-purple-500 font-bold text-sm">Keberangkatan</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <p className="font-medium text-sm">
            Terminal {flightDetails.departure_terminal}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-2">
        <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200" />
      </div>
      <div className="flex flex-start">
        <div className="w-10 flex justify-center p-2">
          <img className="" src={FlowerLogo} alt="" />
        </div>
        <div className="flex flex-col">
          <div>
            <p className="font-bold">Airline {flightDetails.airline_id}</p>
            <p className="font-bold">{flightDetails.plane_code}</p>
          </div>
          <div className="pt-4">
            <p className="font-bold text-sm">Informasi:</p>
            {tickets.map((ticket, index) => (
              <div key={ticket.ticket_id} className="flex flex-col">
                <div className="flex flex-row text-purple-800">
                  <span className="font-regular text-sm">
                    {`Penumpang ${index + 1}: `}&nbsp;
                  </span>
                  <p className="font-regular text-sm">
                    {`${ticket.passenger.title} ${ticket.passenger.full_name}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    ID: <span>{ticket.passenger.id_number}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-2">
        <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200" />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div>
            <p className="font-bold">
              {formatTime(flightDetails.arrival_time)}
            </p>
          </div>
          <div>
            <p className="text-sm">{formatDate(flightDetails.arrival_time)}</p>
          </div>
        </div>
        <div>
          <p className="text-purple-500 font-bold text-sm">Kedatangan</p>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-2">
        <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200" />
      </div>
      <div className="flex justify-col ml-5">
        <div>
          <p className="font-bold text-sm">Rincian Harga</p>
        </div>
      </div>
      <div className="flex justify-between ml-5 text-sm font-regular">
        <p>{tickets.length} Penumpang</p>
        <p>IDR {total_payment.toLocaleString('id-ID')}</p>
      </div>
      <div className="flex justify-center mt-4 mb-2">
        <hr className="w-11/12 h-px bg-gray-200 border-1 dark:bg-gray-200" />
      </div>
      <div className="w-11/12 flex justify-between ml-5">
        <p className="font-bold">Total</p>
        <p className="font-bold text-purple-800">
          IDR {total_payment.toLocaleString('id-ID')}
        </p>
      </div>
      <div className="w-full mt-4">
        {status === 'ISSUED' && (
          <button className="w-full h-16 bg-purple-800 text-white px-4 py-2 rounded-lg">
            Cetak Ticket
          </button>
        )}
        {status === 'PENDING' && (
          <button className="w-full h-16 bg-red-500 text-white px-4 py-2 rounded-lg">
            Lanjut Bayar
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
