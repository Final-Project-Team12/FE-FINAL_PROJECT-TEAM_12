import LogoQuickFly from '../../../public/images/quickfly-vertical.png';

const PrintTicket = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2 border flex flex-col rounded-lg shadow-lg lg:w-1/3 bg-gradient-to-br from-white to-gray-100">
        <div className="flex justify-between items-center px-5 py-2">
          <h1 className="font-bold text-[#7126B5] text-2xl">
            Your Boarding Pass
          </h1>
          <img src={LogoQuickFly} alt="Logo QuickFly" className="w-[70px]" />
        </div>
        <hr className="border-1 border-[#7126B5]" />
        <div className="flex justify-between mt-10 p-5">
          <div className="flex flex-col mt-2 gap-4">
            <span className="text-sm">Passenger: John Doe</span>
            <span className="text-sm">Flight: AB1234</span>
            <span className="text-sm">Departure: 12:30 PM</span>
          </div>
          <div>
            <img
              src="data:image/png;base64,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"
              alt="Flight ticket QR code"
              className="w-[120px] h-[120px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintTicket;
