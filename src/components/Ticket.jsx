import Navbar from './UI/Navbar';
import HeaderTicket from './UI/HeaderTicket';
import DetailsTicket from './UI/DetailsTicket';
import SortTicket from './UI/SortTicket';
import TicketFilterSidebar from './UI/TicketFilterSidebar';

const Ticket = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeaderTicket />  
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="pb-5">
          <SortTicket />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full lg:w-[260px]">
            <TicketFilterSidebar />
          </div>
          <div className="flex w-full pl-10">
            <DetailsTicket />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
