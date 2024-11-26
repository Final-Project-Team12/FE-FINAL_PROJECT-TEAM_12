import Navbar from './UI/Navbar';
import HeaderTicket from './UI/HeaderTicket';
import LeftFilterTicket from "./UI/LeftFilterTicket";
import SortTicket from './UI/SortTicket';

const Ticket = () => {
  return (
    <>
      <Navbar />
      <HeaderTicket />
      <SortTicket />
      <LeftFilterTicket/>
    </>
  );
};

export default Ticket;
