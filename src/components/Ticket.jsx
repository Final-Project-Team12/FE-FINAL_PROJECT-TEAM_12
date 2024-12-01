import Navbar from './UI/Navbar';
import HeaderTicket from './UI/HeaderTicket';
import DetailsTicket from './UI/DetailsTicket';
import SortTicket from './UI/SortTicket';
import TicketFilterSidebar from './UI/TicketFilterSidebar';

const Ticket = () => {
  return (
    <>
      <Navbar /> 
      <HeaderTicket />
      <div>
        <div className="pb-10 mr-4">
          <SortTicket />
        </div>
        <div className="flex ml-[260px] mr-[212px]">
          <TicketFilterSidebar />
          <DetailsTicket />
        </div>
      </div>
    </>
  );
};

export default Ticket;
