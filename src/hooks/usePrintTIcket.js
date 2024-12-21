import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  printTicketStart,
  printTicketSuccess,
  printTicketFailure,
} from '../store/slices/printTicketSlice';
import { printTicket as printTicketService } from '../services/printTicket.service';

const usePrintTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePrintTicket = async (dataPrintTIcket) => {
    try {
      dispatch(printTicketStart());
      const response = await printTicketService(dataPrintTIcket);
      dispatch(printTicketSuccess(response.data));
      await Swal.fire({
        icon: 'success',
        title: 'Print Tiket Berhasil',
        text: 'Tiket berhasil dicetak. Silakan cek tiket Anda.',
        confirmButtonColor: '#7126B5',
      });
      navigate('/print-ticket');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Print tiket gagal';
      dispatch(printTicketFailure(errorMessage));

      await Swal.fire({
        icon: 'error',
        title: 'Print tiket Gagal',
        text: errorMessage,
        confirmButtonColor: '#7126B5',
      });
      throw error;
    }
  };

  return handlePrintTicket;
};

export default usePrintTicket;
