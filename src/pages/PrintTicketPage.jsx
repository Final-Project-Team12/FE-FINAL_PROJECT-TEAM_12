import Navbar from '../components/UI/Navbar';
import PrintTicket from '../components/UI/PrintTicket';
import HeaderPrintTicket from '../components/UI/HeaderPrintTicket';

const PrintTicketPage = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <HeaderPrintTicket />
        <PrintTicket />
      </div>
    </>
  );
};

export default PrintTicketPage;
