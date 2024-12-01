import LoadingTicket from '../components/UI/LoadingTicket';
import Navbar from '../components/UI/Navbar';
import SearchResultEmpty from '../components/UI/SearchResultEmpety';
import SoldoutTicket from '../components/UI/SoldoutTicket';

const ExamplePages = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-24 mt-10">
        <LoadingTicket />
        <SoldoutTicket />
        <SearchResultEmpty />
      </div>
    </>
  );
};

export default ExamplePages;
