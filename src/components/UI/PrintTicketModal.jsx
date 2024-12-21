import { useSelector } from 'react-redux';
import { X } from 'lucide-react'; // Impor ikon X dari Lucide React
import LogoQuickFly from '../../../public/images/quickfly-vertical.png';

const PrintTicketModal = ({ isOpen, onClose }) => {
  const { printTicket, loading, error } = useSelector(
    (state) => state.printTicket
  );

  if (!isOpen) {
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <p>Error: {error.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-[#7126B5] text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!printTicket?.data?.length) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <p>No tickets available to display.</p>
          <button
            className="mt-4 px-4 py-2 bg-[#7126B5] text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F5F7F8] rounded-xl shadow-lg w-11/12 max-w-3xl p-5 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-5">
          {printTicket.data.map((ticket, index) => (
            <div
              key={index}
              className="w-full border flex flex-col rounded-xl shadow-lg bg-gradient-to-br from-white to-gray-100"
            >
              <div className="flex flex-col-reverse justify-between items-center px-5 py-2 md:flex-row">
                <h1 className="flex items-center font-bold text-[#7126B5] text-md md:text-2xl">
                  Your Boarding Pass
                </h1>
                <img
                  src={LogoQuickFly}
                  alt="Logo QuickFly"
                  className="w-[70px]"
                />
              </div>

              <hr className="border-1 border-[#7126B5]" />

              <div className="flex px-5 py-3">
                <span className="text-[#26355D] font-bold text-xs md:text-lg">
                  Airline: {ticket.ticket_details.airline || 'N/A'}
                </span>
              </div>

              <div className="flex flex-col-reverse items-center justify-between px-5 pt-3 pb-4 md:flex-row">
                <div className="flex flex-col mt-2 gap-4">
                  <span className="text-[#26355D] text-xs md:text-sm">
                    Passenger Name:{' '}
                    {ticket.ticket_details.passenger_name || 'N/A'}
                  </span>
                  <span className="text-[#26355D] text-xs md:text-sm">
                    Seat Number: {ticket.ticket_details.seat_number || 'N/A'}
                  </span>
                  <span className="text-[#26355D] text-xs md:text-sm">
                    Flight Number:{' '}
                    {ticket.ticket_details.flight_number || 'N/A'}
                  </span>
                  <span className="text-[#26355D] text-xs md:text-sm">
                    Departure Time:{' '}
                    {ticket.ticket_details.departure_time
                      ? new Date(
                          ticket.ticket_details.departure_time
                        ).toLocaleString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </span>
                </div>
                <div>
                  <img
                    src={ticket.qrCode || ''}
                    alt="Flight ticket QR code"
                    className="w-[120px] h-[120px] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintTicketModal;
