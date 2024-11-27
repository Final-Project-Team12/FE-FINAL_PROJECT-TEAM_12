import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Stepper = ({ isPaymentActive }) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 text-base">
        <span className="font-semibold text-black text-xl">Isi Data Diri</span>
        <MdOutlineKeyboardArrowRight size={24} className="text-gray-400" />
        <span
          className={`font-semibold ${isPaymentActive ? 'text-black' : 'text-gray-400'} text-xl`}
        >
          Bayar
        </span>
        <MdOutlineKeyboardArrowRight size={24} className="text-gray-400" />
        <span className="text-gray-400 text-xl font-semibold">Selesai</span>
      </div>
    </div>
  );
};

export default Stepper;
