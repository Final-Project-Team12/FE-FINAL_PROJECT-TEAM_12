import Navbar from './UI/Navbar';
import HeaderTicket from './UI/HeaderTicket';
import LeftFilterTicket from './UI/LeftFilterTicket';
import DetailsTicket from './UI/DetailsTicket';
import LeftFilterTicket from "./UI/LeftFilterTicket";
import SortTicket from './UI/SortTicket';

const Ticket = () => {
  return (
    <>
      <Navbar />
      <HeaderTicket />
      <div>
        <div className="flex ml-[260px] mr-[212px]">
          <SortTicket />
          <LeftFilterTicket />
          <DetailsTicket />
        </div>
      </div>
    </>
  );
};

export default Ticket;
