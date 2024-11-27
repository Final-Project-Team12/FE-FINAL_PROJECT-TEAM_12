import Navbar from './UI/Navbar';
import HeaderTicket from './UI/HeaderTicket';
import LeftFilterTicket from './UI/LeftFilterTicket';
import DetailsTicket from './UI/DetailsTicket';
import SearchResultEmpty from './UI/SearchResultEmpety';
import LoadingTicket from './UI/LoadingTicket';

const Ticket = () => {
  return (
    <>
      <Navbar />
      <HeaderTicket />
      <div>
        <div className="flex ml-[260px] mr-[212px]">
          <LeftFilterTicket />
          <LoadingTicket />
          {/* <SearchResultEmpty /> */}
          {/* <DetailsTicket /> */}
        </div>
      </div>
    </>
  );
};

export default Ticket;
