import Navbar from './UI/Navbar';
import DetailsTicket from './UI/DetailsTicket';
import SortTicket from './UI/SortTicket';
import TicketFilterSidebar from './UI/TicketFilterSidebar';
import HeaderHistory from './UI/HeaderHistory';

const History = () => {
  return (
    <>
      <Navbar />
      <HeaderHistory />
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

export default History;
