import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderTicket = () => {
  const navigate = useNavigate();

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDay = (date) =>
    date.toLocaleDateString('id-ID', { weekday: 'long' });

  const formatDate = (date) =>
    date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const dates = [
    { day: formatDay(yesterday), date: formatDate(yesterday), active: false },
    { day: formatDay(today), date: formatDate(today), active: true },
    ...Array.from({ length: 6 }, (_, i) => {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i + 1);
      return {
        day: formatDay(futureDate),
        date: formatDate(futureDate),
        active: false,
      };
    }),
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="border-b shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
      <div className="ml-[260px] mr-[212px] mt-[47px]">
        <h2 className="text-xl font-bold mb-[24px]">Pilih Penerbangan</h2>
        <div className="flex gap-3 mx-4">
          <div
            className="w-[700px] h-[50px] rounded-[12px] bg-[#A06ECE] flex items-center "
            onClick={() => navigate('/')}
          >
            <img
              src="../../public/icons/fi_arrow-left.svg"
              alt=""
              className="w-6 h-6 ml-4 hover:scale-125 hover: transition-all duration-10 text-white"
            />
            <div className="ml-3 text-white">
              JKT {'>'} MLB - 2 Penumpang - Economy
            </div>
          </div>
          <button className="w-[220px] h-[50px] rounded-[12px] bg-[#73CA5C] font-bold text-white">
            Ubah Pencarian
          </button>
        </div>

        <div className="flex mt-[10px] mb-[10px]">
          {dates.map(({ day, date }, index) => (
            <div
              key={index}
              className={`relative flex-1 flex justify-center items-center ${
                index === 0
                  ? ''
                  : "before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-6 before:bg-gray-300"
              }`}
            >
              <div
                onClick={() => setActiveIndex(index)}
                className={`flex flex-col items-center cursor-pointer ${
                  activeIndex === index
                    ? 'text-white bg-[#7126B5] rounded-lg p-2'
                    : index === 1
                      ? 'text-white bg-[#A06ECE] rounded-lg p-2'
                      : 'text-gray-600 hover:text-[#7126B5]'
                }`}
              >
                <span className="text-sm font-semibold">{day}</span>
                <span className="text-xs">{date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderTicket;
