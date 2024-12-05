import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderTicket = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b shadow-[0px_4px_10px_rgba(0,0,0,0.1)] pb-5">
      <div className="ml-[260px] mr-[212px] mt-[47px]">
        <h2 className="text-xl font-bold mb-[24px]">Akun</h2>
        <div className="flex gap-3 mx-4">
          <div
            className="w-full h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center hover:bg-purple-800 hover: transition-all duration-10 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <ArrowLeft
              className="w-6 h-6 ml-4 hover:scale-125 hover: transition-all duration-10 text-white"
            />
            <span className="ml-3 text-white">
              Beranda
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTicket;
