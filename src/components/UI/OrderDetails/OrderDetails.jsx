import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useOrderPayment } from '../../../hooks/useOrderPayment';
import FlowerLogo from '../../../../public/icons/flower_icon.svg';
import Swal from 'sweetalert2';
import { setPaymentData } from '../../../store/slices/paymentSlice';
import PrintTicketModal from '../PrintTicketModal';
import usePrintTicket from '../../../hooks/usePrintTIcket';

const OrderDetails = ({ selectedCard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { initiateOrderPayment, loading } = useOrderPayment();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedCard) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-gray-500">No order selected</p>
      </div>
    );
  }

  const {
    tickets = [],
    status = '',
    token = '',
    total_payment = 0,
    user = {},
  } = selectedCard;
  const firstTicket = tickets?.[0] || {};
  const flightDetails = firstTicket?.plane || {};

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
        return 'bg-gray-500';
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
              {flightDetails?.departure_time
                ? formatTime(flightDetails.departure_time)
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm">
              {flightDetails?.departure_time
                ? formatDate(flightDetails.departure_time)
                : '-'}
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
        <div className="h-10 flex justify-center p-2">
          <img className="" src={firstTicket.plane.airline.image_url} alt="" />
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
              {flightDetails?.arrival_time
                ? formatTime(flightDetails.arrival_time)
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm">
              {flightDetails?.arrival_time
                ? formatDate(flightDetails.arrival_time)
                : '-'}
            </p>
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

      <PrintTicketModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default OrderDetails;
