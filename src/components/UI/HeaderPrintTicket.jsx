import { useNavigate } from 'react-router-dom';

const HeaderPrintTicket = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/orderhistory');
  };

  return (
    <div className="flex justify-center mt-7">
      <div className="w-2/3 h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center justify-between px-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleBackClick}
        >
          <img src="/icons/fi_arrow-left.svg" alt="Back" className="mr-2" />
          <p className="text-white">Back</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrintTicket;
