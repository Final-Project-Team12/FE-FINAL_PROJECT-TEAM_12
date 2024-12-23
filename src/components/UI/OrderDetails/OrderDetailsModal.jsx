import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useOrderPayment } from '../../../hooks/useOrderPayment';
import { setPaymentData } from '../../../store/slices/paymentSlice';
import usePrintTicket from '../../../hooks/usePrintTIcket';
import PrintTicketModal from '../PrintTicketModal';
import { formatDate, formatTime } from '../../../utils/orderUtils';

const OrderDetailsModal = ({ selectedCard, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    tickets = [],
    status = '',
    token = '',
    total_payment = 0,
    user = {},
  } = selectedCard;
  const firstTicket = tickets[0];
  const flightDetails = firstTicket?.plane || {};
  const { initiateOrderPayment, loading } = useOrderPayment();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProceedToPayment = async () => {
    if (!flightDetails?.plane_code) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Flight Details',
        text: 'Flight information is missing or invalid',
      });
      return;
    }

    try {
      const paymentResult = await initiateOrderPayment({
        amount: total_payment,
        customerDetails: {
          name: user.name,
          email: user.email,
          mobile_number: user.telephone_number,
          address: user.address,
        },
        productDetails: [
          {
            productId: flightDetails.plane_id?.toString(),
            productName: `Flight ${flightDetails.plane_code}`,
            quantity: 1,
            price: total_payment,
          },
        ],
      });

      if (paymentResult.success) {
        dispatch(
          setPaymentData({
            token: paymentResult.token,
            orderId: paymentResult.orderId,
            amount: total_payment,
            customerDetails: {
              name: user.name,
              email: user.email,
              mobile_number: user.telephone_number,
              address: user.address,
            },
          })
        );

        console.log('Payment initiated successfully');
        navigate(`/payment/${paymentResult.orderId}`);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message || 'Failed to process payment',
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CANCELLED':
      case 'EXPIRED':
        return 'bg-red-500';
      case 'FAILED':
        return 'bg-gray-500';
      default:
        return 'bg-gray-200';
    }
  };
  const printTicket = usePrintTicket();

  const handleCetak = async () => {
    const dataPrintTicket = {
      transaction_id: selectedCard.transaction_id,
    };

    try {
      await printTicket(dataPrintTicket);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Terjadi kesalahan saat mencetak tiket:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[999] isolate">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center px-4 sm:px-8 lg:hidden">
          <div
            className="relative z-50 w-[90vw] sm:w-[80vw] lg:w-[60vw] max-w-3xl bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-50"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="relative p-6">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <h2 className="font-bold mb-2 text-lg md:text-xl">
                    Detail Pesanan
                  </h2>
                  <span
                    className={`text-white text-xs font-light rounded-full px-3 py-1 flex justify-center items-center ${getStatusColor(status)}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="mb-2">
                  <h2 className="font-regular">
                    Booking Code:{' '}
                    <span className="text-purple-800 font-bold">{token}</span>
                  </h2>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-base md:text-lg">
                      {formatDate(flightDetails.departure_time)}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {formatTime(flightDetails.departure_time)}
                    </p>
                  </div>
                  <p className="text-purple-500 font-bold text-sm md:text-base">
                    Kebarangkatan
                  </p>
                </div>
                <p className="font-medium text-sm text-gray-600">
                  {flightDetails.departure_terminal}
                </p>

                <div className="my-4 border-t border-gray-200"></div>

                <div className="flex items-start">
                  <div className="h-8 flex justify-center p-2">
                    <img
                      className=""
                      src={flightDetails.airline.image_url}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    <p className="font-bold text-base md:text-lg">
                      {flightDetails.airline.airline_name}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      Flight Number: {flightDetails.plane_code}
                    </p>

                    <div className="pt-4">
                      <p className="font-bold text-sm md:text-base">
                        Informasi:
                      </p>
                      {tickets.map((ticket, index) => (
                        <div
                          key={ticket.ticket_id || index}
                          className="text-sm md:text-base"
                        >
                          <p className="text-purple-800">
                            Penumpang {index + 1}:{' '}
                            {`${ticket.passenger.title} ${ticket.passenger.full_name}`}
                          </p>
                          <p>ID: {ticket.passenger.id_number}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="my-4 border-t border-gray-200"></div>

                {/* Arrival Information */}
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-base md:text-lg">
                      {formatDate(flightDetails.arrival_time)}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {formatTime(flightDetails.arrival_time)}
                    </p>
                  </div>
                  <p className="text-purple-500 font-bold text-sm md:text-base">
                    Kedatangan
                  </p>
                </div>
                <p className="font-medium text-sm text-gray-600">
                  {flightDetails.departure_terminal}
                </p>

                <div className="my-4 border-t border-gray-200"></div>

                {/* Pricing Details */}
                <div>
                  <p className="font-bold text-sm md:text-base">
                    Rincian Harga
                  </p>
                  <div className="flex justify-between text-sm md:text-base">
                    <p>{tickets.length} Penumpang</p>
                    <p>IDR {total_payment.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <div className="my-4 border-t border-gray-200"></div>

                <div className="flex justify-between font-bold text-sm md:text-base">
                  <p>Total</p>
                  <p className="text-purple-800">
                    IDR {total_payment.toLocaleString('id-ID')}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6">
                  {status === 'SUCCESS' && (
                    <button
                      className="w-full h-16 bg-purple-800 text-white px-4 py-2 rounded-lg"
                      onClick={handleCetak}
                    >
                      Cetak Ticket
                    </button>
                  )}
                  {status === 'PENDING' && (
                    <button
                      onClick={handleProceedToPayment}
                      disabled={loading}
                      className="w-full h-16 bg-red-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : 'Lanjut Bayar'}
                    </button>
                  )}
                </div>
                <PrintTicketModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;
