import Navbar from './UI/Navbar';
import DetailsTicket from './UI/DetailsTicket';
import SortTicket from './UI/SortTicket';
import TicketFilterSidebar from './UI/TicketFilterSidebar';
import HeaderHistory from './UI/HeaderHistory';
import CardHistory from './UI/CardHistory';

const History = () => {
  return (
    <>
      <Navbar />
      <HeaderHistory />
      <div>
        <div className="flex ml-[260px] mr-[212px]">
          <div className="max-w-6xl mx-auto px-4 flex space-x-6 mt-8 justify-center">
            <div className="flex flex-col space-y-4 w-1/2">
              <CardHistory />
            </div>
            <div className="w-[450px] mt-4">test</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
