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
        <div className="pb-6 lg:pb-10">
          <SortTicket />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[260px] order-2 lg:order-1">
            <TicketFilterSidebar />
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <DetailsTicket />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
