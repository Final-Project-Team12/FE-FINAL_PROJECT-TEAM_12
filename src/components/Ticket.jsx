import Navbar from './UI/Navbar';
import HeaderTicket from './UI/HeaderTicket';
import LeftFilterTicket from './UI/LeftFilterTicket';
import DetailsTicket from './UI/DetailsTicket';
import SortTicket from './UI/SortTicket';

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
          <LeftFilterTicket />
          <DetailsTicket />
        </div>
      </div>
    </>
  );
};

export default Ticket;
